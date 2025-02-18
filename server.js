// Importiere Express
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import db from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Erstelle die Express-App
const app = express();
const PORT = 5500; // Backend-Port

// Middleware aktivieren
app.use(cors()); // Erlaubt API-Zugriff von anderen Domains
app.use(express.json()); // Ermöglicht das Parsen von JSON-Body


// Tabellen erstellen, falls nicht vorhanden
db.run(`
  CREATE TABLE IF NOT EXISTS "users" (
    "id" INTEGER,
    "code" INTEGER,
    PRIMARY KEY("id" AUTOINCREMENT)
  );
  CREATE TABLE IF NOT EXISTS "quest_cats" (
	  "id"	INTEGER,
	  "name"	TEXT,
	  PRIMARY KEY("id" AUTOINCREMENT)
  );
  CREATE TABLE IF NOT EXISTS "questions" (
	  "id"	INTEGER,
	  "cat_id"	INTEGER,
	  "name"	TEXT,
	  "EF"	TEXT,
	  PRIMARY KEY("id" AUTOINCREMENT),
	  FOREIGN KEY("cat_id") REFERENCES "quest_cats"("id")
  );
  CREATE TABLE IF NOT EXISTS "quest_results" (
	  "id"	INTEGER,
    "user_id" INTEGER,
	  "quest_id"	INTEGER,
	  "emission"	DOUBLE,
	  PRIMARY KEY("id" AUTOINCREMENT),
	  FOREIGN KEY("quest_id") REFERENCES "questions"("id")
    FOREIGN KEY("user_id") REFERENCES "users"("id")
  );
  `, (err) => {
  if (err) {
      console.error("Fehler beim Erstellen der Tabellen:", err.message);
  } else {
      console.log("Tabellen sind bereit");
  }
});


function generateUniqueUserCode(callback) {
  const randomCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  // Prüfen, ob der Code bereits existiert
  db.get("SELECT code FROM users WHERE code = ?", [randomCode], (err, row) => {
      if (err) {
          console.error("Fehler bei der Code-Prüfung:", err.message);
          callback(null);
      } else if (row) {
          console.log("Code existiert bereits, neuer Versuch...");
          generateUniqueCode(callback); // Falls der Code schon existiert, neuen generieren
      } else {
        callback(randomCode); // Falls der Code einzigartig ist, zurückgeben
      }
  });
}


app.post('/api/user', (req, res) => {
  const { userCode } = req.body;

  generateUniqueUserCode((uniqueCode) => {
    if (!uniqueCode) {
        return res.status(500).json({ error: "Fehler bei der Code-Generierung" });
    }
    const sql = 'INSERT INTO users (code) VALUES (?)'
    const values = [uniqueCode]
    db.run(sql, values, function (err) {
      if(err) {
        console.error("Fehler beim Einfügen: ", err.message);
        return res.status(500).json({error: "Fehler beim Einfügen der Daten"})
      }
      console.log("Nutzer gespeichert: ", {uniqueCode})
      res.json({message: "User erfolgreich gespeichert", code: uniqueCode})
    })
  })
})


// receive living-results from frontend
app.post('/api/living-results', (req, res) => {
  const { userCode, powerConsumption, ecoElectricity, heatingType, heatingConsumption } = req.body; // Daten aus dem Body abrufen

  if ( !userCode && !powerConsumption && !ecoElectricity && !heatingType && !heatingConsumption) {
    return res.status(400).json({ error: "Eingabe fehlt!" });
  }else if (!userCode || !powerConsumption || !ecoElectricity || !heatingType || !heatingConsumption) {
    return res.status(400).json({ error: "Eingabe nicht volständig" });
  }

  //Delete existing results from this questions of this user
  let sql = 'DELETE FROM quest_results WHERE user_id=? AND (quest_id=1 OR quest_id=2)';
  let values = [userCode];
  db.run(sql, values, (err) => {
    if(err){
      console.error("Fehler beim Löschen der Daten")
      return res.status(500).json({error: "Fehler beim Löschen der Daten"})
    } else {
      console.log("Daten erfolgreich gelöscht")

      let sql = 'SELECT EF FROM questions WHERE id=? OR id=? ORDER BY id ASC'
      let values = [1, 2]
      db.all(sql, values, (err, rows) => {
        if(err) {
          console.error("Fehler bei der Abfrage")
          return res.status(500).json({error: "Fehler beim Abfragen des EF"})
        } else if (rows) {
          console.log("EF abgefragt:", {rows});
          

          // Calculate electric emission
          const electricEF = JSON.parse(rows[0]['EF'])[ecoElectricity]
          const electricEmission = powerConsumption * electricEF

          let sql = 'INSERT INTO quest_results (user_id, quest_id, emission) VALUES (?, ?, ?)'
          let values = [userCode, 1, electricEmission]
          db.run(sql, values, (err) => {
            if(err){
              console.error("Fehler beim Einfügen der Daten")
              return res.status(500).json({error: "Fehler beim Einfügen der Daten"})
            } else {
              console.log("Daten erfolgreich eingefügt")
              //res.json({ message: `Ergebnisse für: ${userCode}, ${powerConsumption}, ${ecoElectricity}, ${heatingType}, ${heatingConsumption}` });
            }
          })

          // Calculate heating emission
          const heatingEF = JSON.parse(rows[1]['EF'])[heatingType]
          console.log(heatingEF);
          let heatingEmission;
          if(heatingType != "heatingPump") {
            heatingEmission = heatingConsumption * heatingEF
          } else {
            heatingEmission = heatingConsumption * heatingEF * electricEF
          }
          sql = 'INSERT INTO quest_results (user_id, quest_id, emission) VALUES (?, ?, ?)'
          values = [userCode, 2, heatingEmission]
          db.run(sql, values, (err) => {
            if(err){
              console.error("Fehler beim Einfügen der Daten")
              return res.status(500).json({error: "Fehler beim Einfügen der Daten"})
            } else {
              console.log("Daten erfolgreich eingefügt")
              //res.json({ message: `Ergebnisse für: ${userCode}, ${powerConsumption}, ${ecoElectricity}, ${heatingType}, ${heatingConsumption}` });
            }
          })
        }
      })
    }
    })
})

  




// Server starten
app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});
