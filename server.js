const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

fs.readFile('db/db.json',"utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    console.log(notes);
 
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

    app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        console.log(newNote);
    
        notes = notes + newNote;
    
        res.json(newNote);
    });
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
