const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');





function addFile(file, callback) {
    //avant d'enregistrer le fichier, on vérifie qu'il est en .txt ou en .lrc
    console.log(file);
    if (file.split('.').pop() !== 'lrc' && file.split('.').pop() !== 'txt') {
        console.error('File is not a .lrc or .txt file');
        if(callback) callback('File is not a .lrc or .txt file'); 
        return;
    }
    //on vérifie que le fichier ne contient pas de code malveillant
    const fileContent = fs.readFileSync(file, 'utf8');
    if (fileContent.includes('<script>')) {
        console.error('File contains malicious code');
        if(callback) callback('File contains malicious code'); 
        return;
    }

    //on vérifie que le fichier ne contient pas d'injection SQL
    if (fileContent.includes('DROP TABLE') || fileContent.includes('DELETE FROM') || fileContent.includes('INSERT INTO') || fileContent.includes('UPDATE') || fileContent.includes('ALTER TABLE') || fileContent.includes('CREATE TABLE') || fileContent.includes('SELECT * FROM') || fileContent.includes('DROP DATABASE') || fileContent.includes('CREATE DATABASE') || fileContent.includes('TRUNCATE TABLE') || fileContent.includes('SHOW TABLES') || fileContent.includes('SHOW DATABASES')){
        console.error('File contains SQL injection');
        if(callback) callback('File contains SQL injection'); 
        return;
    }

    //enfin, on vérifie que le fichier contient au moins un nom d'artiste, un titre de chanson et des paroles
    if (!fileContent.includes('[ar:') || !fileContent.includes('[ti:') || !fileContent.includes('[00:')) {
        console.error('File does not contain artist, title or lyrics');
        if(callback) callback('File does not contain artist, title or lyrics'); 
        return;
    }

    // On enregistre le fichier dans un dossier
    fs.copyFile(file, '../lrc_library' + file.originalname, (err) => {
        if (err) { 
            console.error(err); 
            if(callback) callback(err); 
            return; 
        } 
        console.log('File saved successfully!'); 
        if(callback) callback(null); 
    });


    // bon bah voila, c'est ajouté. On a plus qu'à laisser les admins vérifier que c'est bien une chanson et pas un truc chelou; puis ils n'auront qu'à utiliser create_DB pour mettre la base à jour !
}
module.exports = addFile;





