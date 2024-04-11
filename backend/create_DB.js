const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Ouvrir la connexion à la base de données (ou la créer si elle n'existe pas)
let db = new sqlite3.Database('./songs.db');

// Créer une table
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS songs (id INTEGER PRIMARY KEY, name TEXT, artist TEXT, year TEXT, offset INT, genre TEXT,lyrics TEXT)");
});



const dossier = 'lrc_library';

let id_song=0;

// Lire le contenu de chaque fichier dans le dossier
fs.readdir(dossier, (err, fichiers) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier :", err);
    return;
  }

  // Parcourir chaque fichier dans le dossier
  fichiers.forEach(fichier => {
    // Lire le contenu du fichier
    fs.readFile(`${dossier}/${fichier}`, 'utf8', (err, data) => {
      if (err) {
        console.error(`Erreur lors de la lecture du fichier ${fichier} :`, err);
        return;
      }
      // Extraire le nom de la chanson
      let nomMatch = data.match(/\[ti:(.*?)\]/);
      if (!nomMatch || !nomMatch[1]) {
        console.error(`Impossible de trouver le nom de la chanson dans le fichier ${fichier}`);
        return;
      }
      var nom = nomMatch[1];
      
      
      // Extraire l'artiste de la chanson
      let artisteMatch = data.match(/\[ar:(.*?)\]/);
      let artiste = artisteMatch && artisteMatch[1] ? artisteMatch[1] : '';
      
      
      //Extraire le genre de la chanson
      //TODO: rajouter les genres aux fichiers lrc

      let genreMatch = data.match(/\[ge:(.*?)\]/);
      let genre = genreMatch && genreMatch[1] ? genreMatch[1] : '';

      //Extraire l'année de la chanson
      //TODO: rajouter les années aux fichiers lrc
      let anneeMatch = data.match(/\[ye:(.*?)\]/);
      let annee = anneeMatch && anneeMatch[1] ? anneeMatch[1] : '';

      //Extraire l'offset de la chanson
      //TODO: rajouter les offsets aux fichiers lrc
      let offsetMatch = data.match(/\[of:(.*?)\]/);
      let offset = offsetMatch && offsetMatch[1] ? offsetMatch[1] : 0;

      // Extraire les paroles et les timestamp associés
      const regexLigne = /\[(\d+:\d+\.\d+)\](.*)/g;
      let match;
      let paroles = [];
      let previousMstime = 0; // Initialiser le timestamp précédent à 0
      while ((match = regexLigne.exec(data)) !== null) {
        let timestamp = match[1];
        let lyrics = match[2];
        // Transformer les timestamp en durée d'apparition en millisecondes
        let timestampParts = timestamp.split(/:|\./);
        let minutes = parseInt(timestampParts[0]);
        let seconds = parseInt(timestampParts[1]);
        let milliseconds = parseInt(timestampParts[2]);
        let mstime = (minutes * 60 + seconds) * 1000 + milliseconds;
        let duration = mstime - previousMstime; // Calculer la durée d'apparition
        previousMstime = mstime; // Mettre à jour le timestamp précédent pour la prochaine itération
        // Ajouter les paroles et le timestamp dans paroles
        paroles.push({ lyrics, duration });
      }
    
        // Formater les données pour les insérer dans la base de données
        id_song++;

        let formated_data = {
          id:id_song,
          title: nom,
          artistId: artiste,
          lyrics: paroles
        };
        //plus qu'à insérer les données dans la base de données
        //avant d'insérer, on vérifie qu'une chanson portant ce nom n'existe pas déjà
        db.get("SELECT * FROM songs WHERE name = ?", [nom], function(err, row) {
          if (err) {
            console.error("Erreur lors de la vérification de l'existence de la chanson :",err.message );
            return;
          }
          if (row) {
            console.error(`La chanson ${nom} existe déjà dans la base de données`);
            return;
          }
        });
        db.run("INSERT INTO songs (id, name, artist, year, offset, genre, lyrics) VALUES (?, ?, ?, ?, ?, ?, ?)", [id_song,nom,artiste, annee,offset, genre, JSON.stringify(formated_data)], function(err) {
        if (err) {
          console.error("Erreur lors de l'insertion des données dans la base de données :",err.message );
          return;
        }
      });
      
      
    });
  });
});
