const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');





function addFile(fileText,fileMusic, callback) {
    //avant d'enregistrer le fichier, on vérifie qu'il est en .txt ou en .lrc et qu'ils ont le meme nom

    const fileContent = fs.readFileSync(fileText.path, 'utf8');
    
    if (fileText.originalname.split('.').pop() !== 'lrc' && fileText.originalname.split('.').pop() !== 'txt') {
        console.error('File is not a .lrc or .txt fileText');
        if(callback) callback('File is not a .lrc or .txt fileText'); 
        return;
    }
    
    //on vérifie que le fichier ne contient pas de code malveillant
    else if (fileContent.includes('<script>')) {
        console.error('File contains malicious code');
        if(callback) callback('File contains malicious code'); 
        return;
    }

    //on vérifie que le fichier ne contient pas d'injection SQL
    else if (fileContent.includes('DROP TABLE') || fileContent.includes('DELETE FROM') || fileContent.includes('INSERT INTO') || fileContent.includes('UPDATE') || fileContent.includes('ALTER TABLE') || fileContent.includes('CREATE TABLE') || fileContent.includes('SELECT * FROM') || fileContent.includes('DROP DATABASE') || fileContent.includes('CREATE DATABASE') || fileContent.includes('TRUNCATE TABLE') || fileContent.includes('SHOW TABLES') || fileContent.includes('SHOW DATABASES')){
        console.error('File contains SQL injection');
        if(callback) callback('File contains SQL injection'); 
        return;
    }

    //enfin, on vérifie que le fichier contient au moins un nom d'artiste, un titre de chanson et des paroles
    else if (!fileContent.includes('[ar:') || !fileContent.includes('[ti:') || !fileContent.includes('[00:')) {
        console.error('File does not contain artist, title or lyrics');
        //on enregistre le nom de la chanson et de l'artiste
        const artist = fileContent.match(/\[ar:(.*?)\]/)[1];
        const title = fileContent.match(/\[ti:(.*?)\]/)[1];
        if(callback) callback('File does not contain artist, title or lyrics'); 
        return;
    }

    // On enregistre le fichier dans un dossier
    else fs.copyFile(fileText.path, '../lrc_library' + fileText.originalname, (err) => {
        if (err) { 
            console.error(err); 
            if(callback) callback(err); 
            return; 
        } 
        console.log('File Text saved successfully!'); 
    });

    //on vérifie que le fichier est bien un fichier mp3
    if (fileMusic.mimetype !== 'audio/mpeg') {
        console.error('File is not an mp3 fileMusic');
        if(callback) callback('File is not an mp3 fileMusic'); 
        return;
    }
    //on ajoute le fichier dans le répositoire
     else {fs.copyFile(fileMusic.path, `../frontend/assets/mp3_library/${artist} - ${title}.mp3`, (err) => {
        if (err) { 
            console.error(err); 
            if(callback) callback(err); 
            return; 
        } 
        console.log('File Music saved successfully!'); 
    });}

    // bon bah voila, c'est ajouté. On a plus qu'à laisser les admins vérifier que c'est bien une chanson et pas un truc chelou; puis ils n'auront qu'à utiliser create_DB pour mettre la base à jour !
}
module.exports = addFile;
