// Récuperer les deux fichiers côté client (à patch) ------------------------------------------
// Ben ouais, il faudrait les récupérer côté serveur

document.getElementById('fileInputLrc').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var content = e.target.result;
    parseLrcFile(content);
  };
  reader.readAsText(file);
});

document.getElementById('fileInputAudio').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var url = URL.createObjectURL(file);
  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = url;
  audioPlayer.play(); // Commence la lecture dès que l'audio est chargé
});

// -----------------------------------------------------------------------------------------

function parseLrcFile(lrcContent) {
  var lines = lrcContent.split('\n'); // Split par lignes
  var subtitles = [];

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
  
  var audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.addEventListener('timeupdate', function() {
    var currentTime = audioPlayer.currentTime; // Ouais c'est un méga truc de bourrin
    subtitles.forEach(subtitle => {
      if (Math.abs(currentTime - subtitle.time) < 0.5) { // Ajustez ce seuil au besoin
        console.log(subtitle.text); // Affiche le sous-titre proche du temps actuel
      }
    });
  });
}

function parseTimeStamp(timeStamp) {
  // Convertit le timestamp HH:MM:SS des fichiers LRC en secondes
  var parts = timeStamp.split(':');
  var minutes = parseInt(parts[0], 10);
  var seconds = parseFloat(parts[1]);
  return minutes * 60 + seconds;
}
