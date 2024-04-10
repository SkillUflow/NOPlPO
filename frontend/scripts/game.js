var sectionParoles = document.getElementById("ParolesSection");

var canWrite = false;
function generateTrou(parole){
    listeMots = parole.split(" ");
    nbMots = listeMots.length;
    let placeMot = Math.round(Math.random()*((nbMots-2)-2)+1);
    if(placeMot==0){placeMot = 1};
    listeMots[placeMot-1]="_".repeat(listeMots[placeMot-1].length);
    listeMots[placeMot+1]="_".repeat(listeMots[placeMot+1].length);
    listeMots[placeMot]="_".repeat(listeMots[placeMot].length);
    console.log(listeMots);
    stringMots = listeMots.join(' ')
    return stringMots;

}

let entreesClavier = [];


 
document.addEventListener('keydown', function(e) {
  if(canWrite){
    if (e.key !== 'Enter') {
      entreesClavier.push(e.key);
    } else {
      console.log(entreesClavier);
      calculateScore(entreesClavier.toString(), 'C\'est deuxième gaou qui est niata oh ah');
      entreesClavier = []; 
    }
  }
});





const paroles = [
    "Nan guin nan wan, nan guin nan wan",
    "Nan guin nan wan, nan guin nan wan",
    "Dieu merci pour moi je savais chanter un peu",
    "J'ai fait ma cassette oh on me voit à la télé",
    "Matin midi soir c'est moi je chante à la radio",
    "Antou a vu çà elle dit le gaou a percé",
    "Attends je vais partir le couper",
    "Et on dit premier gaou n'est pas gaou oh",
    "C'est deuxième gaou qui est niata oh ah"
]

var paroleTrou = 8;
var lastParoleIndice = 0;


function afficherParole(){
    if(lastParoleIndice<paroleTrou){
        let j =0;
        if(lastParoleIndice<5){
            dep = 0;
        }else{
            dep = lastParoleIndice-4;
        }
        for(i=lastParoleIndice;i>=dep;i--){
            sectionParoles.children[4-j].innerHTML = paroles[i];
            j++;
        }
    lastParoleIndice++;
    setTimeout(afficherParole,1000);
    }
    else{
        const parolesTrou = generateTrou(paroles[paroleTrou]);
        document.getElementById("paroleCompleter").innerText = parolesTrou;
        canWrite = true;
    }
    
}

afficherParole();   






function calculateScore(typedLyrics, correctLyrics) {
    // Use fetch API to send a POST request to the server
    fetch('/calculate-score', {
      method: 'POST', // Specify the method
      headers: {
        // Content-Type header is important for server to know how to parse the body
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // Convert the data to URL encoded string before sending
      body: `typed_lyrics=${encodeURIComponent(typedLyrics)}&correct_lyrics=${encodeURIComponent(correctLyrics)}`
    })
    .then(response => {
      if (!response.ok) {
        // If response is not ok, throw an error
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON in the response
    })
    .then(data => {
      // Handle the data (the score)
      console.log(data);
      // For example, if you want to display the score in an element with id="score"
      document.getElementById('score').textContent = `Score: ${data.score}`;
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data: ', error);
    });
  }

    // Example usage on button press

document.getElementById('confirm-lyrics').addEventListener('click', () => {
    const typedLyrics = document.getElementById('typed-lyrics').value;
    calculateScore(typedLyrics, 'C\'est deuxième gaou qui est niata oh ah');
});