const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { compareLyrics } = require('./lyrics-check.js');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate-score', (req, res) => {
    const {typed_lyrics, correct_lyrics} = req.body;
    const score = compareLyrics(correct_lyrics, typed_lyrics);
    res.send({score});
});

app.listen(port, () => {
  console.log(`Calculator app listening at http://localhost:${port}`);
});
