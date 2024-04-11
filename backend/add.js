const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Récupérer le chemin du fichier à partir des arguments de la ligne de commande
const filePath = process.argv[2];

// Vérifier si le chemin du fichier est spécifié
if (!filePath) {
    console.error('Veuillez fournir un chemin de fichier.');
    process.exit(1); // Quitter le processus avec un code d'erreur
}

// Définir la fonction pour lire le fichier
function lireFichier(nomFichier) {
    fs.readFile(nomFichier, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur de lecture du fichier :', err);
            return;
        }
        // Appeler la fonction avec le contenu du fichier comme paramètre
        maFonction(data);
    });
}

// Appeler la fonction avec le chemin du fichier comme paramètre
lireFichier(filePath);

// Définir la fonction qui prend le contenu du fichier en paramètre
function maFonction(contenu) {
    console.log('Contenu du fichier :', contenu);
    // Faites quelque chose avec le contenu du fichier ici
}
