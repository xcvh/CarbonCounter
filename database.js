import sqlite3 from 'sqlite3';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Pfad zur Datenbankdatei
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const dbPath = resolve(__dirname, 'database.db');

// Verbindung zur SQLite-Datenbank
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('❌ Fehler bei der Verbindung zur Datenbank:', err.message);
    } else {
        console.log(`✅ Verbunden mit SQLite-Datenbank: ${dbPath}`);
    }
});

export default db;
