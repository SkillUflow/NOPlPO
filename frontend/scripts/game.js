// Import nav, footer

fetch('/assets/header.html').then(response => response.text()).then(html => document.getElementsByTagName('header')[0].innerHTML = html);
fetch('/assets/footer.html').then(response => response.text()).then(html => document.getElementsByTagName('footer')[0].innerHTML = html);

var sectionParoles = document.getElementById("ParolesSection");

var paroles = []

let song_name = localStorage.getItem("songName");
continuePlaying = false;

// Use fetch API to send a POST request to the server
  fetch('/getFromName', {
      method: 'POST', // Specify the method
      headers: {
        // Content-Type header is important for server to know how to parse the body
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // Convert the data to URL encoded string before sending
      body: `name=${encodeURIComponent(song_name)}`
    })
    
    .then(response => {
      if (!response.ok) {
        // If response is not ok, throw an error
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the JSON in the response
    })
    .then(data => {
      GestionParoles(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data: ', error);
    })

var paroleTrou = 0;

async function GestionParoles(songData){
  let songDataJson = JSON.parse(songData["song_info"].lyrics);
  paroles = songDataJson.lyrics;
  document.getElementById("musique").src="assets/mp3_library/"+songDataJson.artistId.trim()+" - "+songDataJson.title.trim()+".mp3";
  
  //choix de la ligne a trouer

  do{
  paroleTrou = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
  }while(paroles[paroleTrou].lyrics.split(" ").length <=3);



 if(songData["song_info"].offset>=0){
    musique.currentTime = (songData["song_info"].offset)/1000;
 }

 musTime = 0;
  afficherParole();
  if(songData["song_info"].offset<0){
    musTime = -songData["song_info"].offset;
  }
  setTimeout(launchMusique,musTime) 
}


function launchMusique(){
  document.getElementById('musique').play();
}

var lastParoleIndice = 0;

var dropedParoles ="";



var canWrite = false;
function generateTrou(parole){

    listeMots = parole.split(" ");
    nbMots = listeMots.length;
    let placeMot = Math.round(Math.random()*((nbMots-2)-2)+1);
    if(placeMot==0){placeMot = 1};

    dropedParoles = listeMots[placeMot-1]+" "+listeMots[placeMot]+" "+listeMots[placeMot+1];
    listeMots[placeMot-1]="<span id='fillSpan'>"+"_".repeat(listeMots[placeMot-1].length);
    listeMots[placeMot+1]="_".repeat(listeMots[placeMot+1].length)+"</span>";
    listeMots[placeMot]="_".repeat(listeMots[placeMot].length);
    stringMots = listeMots.join(' ')
    return stringMots;

}

let entreesClavier = [];


 
document.addEventListener('keydown', function(e) {

  if(canWrite){
    e.preventDefault(); 
    switch(e.key){
      case 'Enter':
      
        calculateScore(entreesClavier.join('').replace(/<\/?[^>]+(>|$)/g, ""), dropedParoles);
        visualCheck();
        entreesClavier = []; 
        canWrite = false;
        break;
      case 'Backspace':
        entreesClavier.pop();
        document.getElementById("fillSpan").innerHTML = entreesClavier.join('');
        break;
      case 'Alt':
      case 'Tab':
      case 'F5':
      case 'F12':
      case 'Control':
      case 'CapsLock':
      case 'AudioVolumeUp':
      case 'AudioVolumeDown':
      case 'Shift':
        break;
      default:
        entreesClavier.push("<span class='fillLetter'>"+e.key+"</span>");
        document.getElementById("fillSpan").innerHTML = entreesClavier.join(''); 
    }



  }
});






function afficherParole(){
  var timeout = 1000;
    if(lastParoleIndice!=paroleTrou || continuePlaying == true){
        let j =0;
        timeout = paroles[lastParoleIndice].duration;
        if(lastParoleIndice<5){
            dep = 0;
        }else{
            dep = lastParoleIndice-4;
        }
        for(i=lastParoleIndice;i>=dep;i--){
            sectionParoles.children[4-j].innerHTML = paroles[i].lyrics;
            j++;
            
        }
    lastParoleIndice++;
    
    setTimeout(afficherParole,timeout);
    }
    else{
        musique.pause();
        const parolesTrou = generateTrou(paroles[paroleTrou].lyrics);
        document.getElementById("paroleCompleter").innerHTML = parolesTrou;
        canWrite = true;
    }
    
}








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
    

      //effet grapghique


      // For example, if you want to display the score in an element with id="score"
      document.getElementById('score').textContent = `${data.score}%`;
      scoreText = document.getElementById('score');
      console.log(data.score);
      if(data.score==200){
        scoreText.style.color="#00f0ff";
        scoreText.textContent = scoreText.textContent+"\n Aucune parole oubliée!"
      }
      if(data.score<=100){
        scoreText.style.color="#36ff00";
      }
      if(data.score<=75){
        scoreText.style.color="#c5ff00";
      }
      if(data.score<=50){
        scoreText.style.color="#ffae00";
      }
      if(data.score<= 25){
        scoreText.style.color="#eb0000";
      }
      
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data: ', error);
    });
  }

    // Example usage on button press





function visualCheck(){
    let typedLettersList = document.getElementsByClassName("fillLetter");
    index = 0;
    document.getElementById("parolesCompletesDiv").style.display="flex";
    function editLetter(){
      if(index<typedLettersList.length){
        document.getElementById("parolesVraies").innerText = dropedParoles.slice(0,index+1);
        if(dropedParoles[index]&&typedLettersList[index]&&dropedParoles[index].toLocaleLowerCase()==typedLettersList[index].innerText.toLocaleLowerCase()){
          typedLettersList[index].style.color="#05E800"
        }else{
          typedLettersList[index].style.color="#F23E3E"
        }
        index+=1;
        if(typedLettersList[index]&&typedLettersList[index].innerText==" "){
          time =0;
        }else{
          time = 100;
        }
        setTimeout(editLetter,time);
      }else{
        let cadre = document.getElementById("CadreParole");
        let parolesCompletesDiv = document.getElementById("parolesCompletesDiv")
        parolesCompletesDiv.innerText = dropedParoles
        document.getElementById('musique').play();
        document.getElementById('musique').volume = 0.25
        document.getElementById('EndGameSection').style.display="flex";

        cadre.style.height = "7%";
        cadre.style.width="50%"
        cadre.style.opacity = 0.6;
        cadre.style.fontSize= "1rem";

        parolesCompletesDiv.style.height = "5%";
        parolesCompletesDiv.style.width = "30%";
        parolesCompletesDiv.style.fontSize = "0.5rem";
        parolesCompletesDiv.style.opacity = 0.6;

        continuePlaying =true;

        afficherParole();
      }

       
        
      
    }

    editLetter();

}







