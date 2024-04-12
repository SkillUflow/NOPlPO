const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const { compareLyrics } = require('./lyrics-check.js');
const { getFromName } = require('./get_from_name.js');
const { getAllSongsFromDB } = require('./get_from_server.js');
const { addNewSong } = require('./addNewSong.js');
const { readFile } = require('fs');
const addFile = require('./addNewSong.js');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../frontend')); // Serve the frontend folder (thus, put every static file in this folder)

app.get('/', (req, res) => {
  res.redirect('/landing.html');
});

app.post('/calculate-score', (req, res) => {
    const {typed_lyrics, correct_lyrics} = req.body;
    const score = compareLyrics(correct_lyrics, typed_lyrics);
    res.send({score});
});


app.post('/getFromName', async (req, res) => {
  const name = req.body; // Assurez-vous que ceci extrait correctement la chaîne du nom de la chanson.
  
  try {
    // Attendez le résultat avant de continuer.
    const song_info = await getFromName(name);
    console.log(song_info);
    res.send({ song_info });
  } catch (error) {
    console.error(error);
    // Gestion des erreurs: envoyez une réponse d'erreur au client.
    res.status(500).send({ error: 'Une erreur est survenue' });
  }
});


// Louis tient à dire qu'il a fait ça tout seul comme un grand.
// On garde espoir qu'il soit un jour capable d'utiliser Git correctement.
app.post('/getAllSongsFromDB', async (req, res) => {  
  try {
    const songs = await getAllSongsFromDB();
    res.send({ songs });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Une erreur est survenue' });
  }
});


//on utilise multer pour gérer les fichiers
const uploadDirectory = path.join(__dirname, '../lrc_library');

// Configurer multer pour gérer les fichiers téléchargés
const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliser le nom de fichier d'origine
    }
});

const upload = multer({ storage: storage });

app.post('/add_song', upload.single('songFile'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('Aucun fichier sélectionné.');
  }

  const { file } = req;
  try {
      addFile(file.path, (err) => {
          if (err) {
              console.error("Erreur lors de la copie du fichier :", err);
              res.status(500).send({ error: 'Une erreur est survenue lors de la copie du fichier' });
          } else {
              console.log("Fichier copié avec succès.");
              res.send({ message: "Chanson ajoutée avec succès" });
          }
      });
  } catch (error) {
      console.error("Erreur lors de l'ajout de la chanson :", error);
      res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`NOPlPO app listening at http://localhost:${port}`);
});