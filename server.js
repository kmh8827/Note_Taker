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
    let notes = JSON.parse(data);
    console.log(notes);
 
    app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

    app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

    app.post('/api/notes', (req, res) => {
        const newNote = req.body;

        console.log(newNote);
    
        notes.push(newNote);
        writeNotes();
        return res.json(newNote);
    });

    writeNotes = () => {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
        });

        return console.log('Note Written');
    };

});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
