const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { compareLyrics } = require('./lyrics-check.js');
const { getFromName } = require('./get_from_name.js');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../frontend')); // Serve the frontend folder (thus, put every static file in this folder)

app.post('/calculate-score', (req, res) => {
    const {typed_lyrics, correct_lyrics} = req.body;
    const score = compareLyrics(correct_lyrics, typed_lyrics);
    res.send({score});
});

app.post('/getFromName', async (req, res) => {
  const name = req.body;
  const song_info = await getFromName(name);
  console.log(song_info);
  res.send({song_info});
});

app.listen(port, () => {
  console.log(`NOPlPO app listening at http://localhost:${port}`);
});
