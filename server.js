const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
// Creates server at port 3000
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let notes = [];

// Getting the JSON file
fs.readFile('db/db.json',"utf8", (err, data) => {
    if (err) throw err;
    notes = data ? JSON.parse(data) : [];
});

const writeNotes = () => {
    fs.writeFile("db/db.json",JSON.stringify(notes),err => {
        if (err) throw err;
    });
};

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Adding to the JSON File
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    notes.push([...notes, newNote]);
    writeNotes();
    return res.json(newNote);
});

// Adding to the JSON File
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    notes = notes.filter(note => note.id !== id);
    writeNotes();
    return res.json(notes);
});

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));