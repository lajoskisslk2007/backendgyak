import express from 'express';

const app = express();
const PORT = 3000;

// Middleware a JSON formátumú kérések fogadásához
app.use(express.json());

// Memóriabeli adatbázis (kezdeti adatok)
let diakok = [
  { id: 101, nev: "Kovács Péter", szak: "Szoftverfejlesztő" },
  { id: 102, nev: "Nagy Anna", szak: "Hálózatépítő" }
];

// 1. READ (GET): Összes diák lekérése
app.get('/api/diakok', (req, res) => {
  res.status(200).json(diakok);
});
app.post('/api/diakok', (req, res) => {
  const ujDiak = {
    id: diakok.length > 0 ? diakok[diakok.length - 1].id + 1 : 101,
    nev: req.body.nev,
    szak: req.body.szak
  };

  diakok.push(ujDiak);

  // 201 Created állapotkód küldése a válaszban
  res.status(201).json(ujDiak);
});
app.put('/api/diakok/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const diak = diakok.find(d => d.id === id);

  if (!diak) {
    return res.status(404).json({ uzenet: "A keresett diák nem található!" });
  }

  diak.nev = req.body.nev || diak.nev;
  diak.szak = req.body.szak || diak.szak;

  res.status(200).json(diak);
});

// 4. DELETE (DELETE): Diák törlése ID alapján
app.delete('/api/diakok/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = diakok.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ uzenet: "A törlendő diák nem található!" });
  }

  diakok.splice(index, 1);
  res.status(204).send(); // 204 No Content
});


// Szerver indítása
app.listen(PORT, () => {
  console.log(`A szerver fut: http://localhost:${PORT}`);
});