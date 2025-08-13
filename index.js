const express = require("express");
let memes = require("./memes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World from Express memes");
});

app.get("/memes", (req, res) => {
    res.send(memes);
});

app.get("/memes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const meme = memes.find(meme => meme.id === id);
    res.send(meme);
});

app.post("/memes", (req, res) => {
    const newMeme = req.body;
    memes.push(newMeme);
    res.send(memes);
});

app.delete("/memes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    memes = memes.filter(meme => meme.id !== id);
    res.send(memes);
});

app.put("/memes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMeme = req.body;
    memes = memes.map(meme => meme.id === id ? updatedMeme : meme);
    res.send(memes);
});

app.use((req, res) => {
    res.status(404).send("404 Not Found");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});