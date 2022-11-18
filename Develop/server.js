const express = require('express');
const path = require('path');
const fs = require('fs');
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;
const {v4:uuidv4} = require("uuid")

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        console.log(error)
        console.log(data)
        res.send(data)
    })
})
app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        console.log(error)
        const notes = JSON.parse(data)
        notes.push({...req.body, id:uuidv4()})
        fs.writeFile("./db/db.json", JSON.stringify(notes), function (error) {
            console.log(error)
            res.send(req.body)
        })

    })
})

app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        console.log(error)
        const notes = JSON.parse(data)
        const filteredNotes = notes.filter(note => note.id !== req.params.id)
        fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), function (error) {
            console.log(error)
            res.send(req.body)
        })

    })
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));