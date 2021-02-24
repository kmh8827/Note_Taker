const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
// Creates server at port 3000
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Getting the JSON file
fs.readFile('db/db.json',"utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
 
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

    app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

    // Adding to the JSON File
    app.post('/api/notes', (req, res) => {
        const newNote = req.body;
    
        notes.push(newNote);
        writeNotes();
        return res.json(newNote);
    });

    writeNotes = () => {
        fs.writeFile("db/db.json",JSON.stringify(notes),err => {
            if (err) throw err;
        });
    };

});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));