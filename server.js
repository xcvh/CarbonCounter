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

// Test
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hallo1!' });
});

//Get the questions and answers for the form
app.get('/api/questions', (req, res) => {
  res.json({ message: '<Die Fragen>' });
});

//Send the answers/results to the backend
app.post('/api/answers', (req, res) => {
  res.status(201).json({ message: 'Antworten gespeichert' });
});

// Get the results
app.get('/api/results', (req, res) => {
  res.json({ message: '<Results>' });
});

// Geht the suggestions
app.get('/api/suggestions', (req, res) => {
  res.json({ message: '<Results>' });
});


// Server starten
app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});
