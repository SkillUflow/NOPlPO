const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Ouvrir la connexion à la base de données (ou la créer si elle n'existe pas)
let db = new sqlite3.Database('./songs.db');

// Créer une table
db.serialize(function() {
db.run("CREATE TABLE IF NOT EXISTS songs (id INTEGER PRIMARY KEY, name TEXT, lyrics TEXT)");
});




const dossier = '../lrc_library';

// Lire le contenu de chaque fichier dans le dossier
fs.readdir(dossier, (err, fichiers) => {
  if (err) {
    console.error("Erreur lors de la lecture du dossier :", err);
    return;
  }

  // Parcourir chaque fichier dans le dossier
  let id_song=0;
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
        let formated_data = {
          id:id_song,
          title: nom,
          artistId: artiste,
          lyrics: paroles
        };
        db.run("INSERT INTO songs (name, lyrics) VALUES (?, ?)", [nom, JSON.stringify(formated_data)], function(err) {
        id_song++;
        if (err) {
          console.error("Erreur lors de l'insertion des données dans la base de données :",err.message );
          return;
        }
      });
      
      
    });
  });
});


// Fermer la connexion à la base de données
db.close();


// Fermer la connexion à la base de données
