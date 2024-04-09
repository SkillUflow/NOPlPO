var subtitles = [];

function parseTimeStamp(timeStamp) {
  // Convertit le timestamp HH:MM:SS des fichiers LRC en secondes
  var parts = timeStamp.split(':');
  var minutes = parseInt(parts[0], 10);
  var seconds = parseFloat(parts[1]);
  return minutes * 60 + seconds;
}

async function loadLRC(link) {
  const reponse = await fetch(link);
  const lrcContent = await reponse.text();

  var lines = lrcContent.split('\n'); // Split par lignes

  for (let i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.startsWith('[') && line.indexOf(']') !== -1) {
      let timeStampEndIndex = line.indexOf(']');
      let timeStamp = parseTimeStamp(line.substring(1, timeStampEndIndex));
      let text = line.substring(timeStampEndIndex + 1).trim();
      if (text) {
        subtitles.push({ time: timeStamp, text: text });
      }
    }
  }
}

async function loadMP3(link){
  const reponse = await fetch(link);
  const url = reponse.url;

  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = url;

  audioPlayer.play(); 
  // Non-supporté par Firefox. La tuile !
}

var current_song = "Orelsan - Basique"
current_song = "Adele - Rolling in the Deep"
var LRCfile = loadLRC((current_song+".lrc"))
var MP3file = loadMP3((current_song+".mp3"))
  
audioPlayer.addEventListener('timeupdate', function() {
  var currentTime = audioPlayer.currentTime; // Ouais c'est un méga truc de bourrin
  subtitles.forEach(subtitle => {
    if (Math.abs(currentTime - subtitle.time) < 0.5) { // Ajustez ce seuil au besoin
      console.log(subtitle.text); // Affiche le sous-titre proche du temps actuel
    }
  });
});
