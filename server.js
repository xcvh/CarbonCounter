// Importiere Express
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Erstelle die Express-App
const app = express();
const PORT = 5000; // Backend-Port

// Middleware: Statische Dateien ausliefern
app.use(express.static(path.resolve(__dirname, 'public')));

// Beispielroute
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hallo1!' });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});
