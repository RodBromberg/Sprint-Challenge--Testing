const express = require("express");
const server = express();
server.use(express.json());

const videoGames = [];

server.get("/games", (req, res) => {
  res.status(200).json(videoGames);
});

server.post("/games", (req, res) => {
  const newGame = {
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear
  };
  if (!newGame.title || !newGame.genre || !newGame.releaseYear) {
    res.status(422).json({ err: "Need all info" });
  } else {
    res.status(201).json({ newGame });
  }
});

module.exports = server;
