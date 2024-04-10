var sectionParoles = document.getElementById("ParolesSection");



// const songData = {
//   "id":28,
//   "title":" La Quête",
//   "artistId":" Orelsan",
//   "lyrics":[
//     {"lyrics":" Rien peut m'ramener plus en arrière","duration":8018},
//     {"lyrics":" Que l'odeur d'la pâte à modeler","duration":2002},
//     {"lyrics":" Maman est prof de maternelle","duration":2005},
//     {"lyrics":" C'est même la maîtresse d'à-côté","duration":1989},
//     {"lyrics":" J'ai cinq ans et j'passe par la fenêtre","duration":2021},
//     {"lyrics":" Pour aller m'planquer dans sa classe","duration":1999},
//     {"lyrics":" Elle m'dit \"t'es pas censé être là\"","duration":1991},
//     {"lyrics":" J'ai dit \"près d'toi, c'est là ma place\"","duration":2003},
//     {"lyrics":" J'aime que les livres, j'préfère être seul","duration":1986},
//     {"lyrics":" Donc j'suis plus content quand il pleut","duration":2027},
//     {"lyrics":" J'fais quelques cours de catéchisme","duration":1976},
//     {"lyrics":" Mais j'suis pas sûr de croire en Dieu","duration":2025},
//     {"lyrics":" J'ai sept ans, la vie est facile","duration":1980},
//     {"lyrics":" Quand j'sais pas, j'demande à ma mère","duration":2012},
//     {"lyrics":" Un jour, elle m'a dit \"j'sais pas tout\"","duration":1993},
//     {"lyrics":" J'ai perdu foi en l'Univers","duration":2000},
//     {"lyrics":" À cinq ans, j'voulais juste en avoir sept","duration":3042},
//     {"lyrics":" À sept ans, j'étais pressé d'voir le reste","duration":3989},
//     {"lyrics":" Aujourd'hui, j'aimerais mieux qu'le temps s'arrête","duration":3994},
//     {"lyrics":" Ah, c'qui compte c'est pas l'arrivée, c'est la quête","duration":3040},
//     {"lyrics":" J'balaye les feuilles mortes sur le terrain","duration":3926},
//     {"lyrics":" Le froid m'fait des cloques sur les mains","duration":2020},
//     {"lyrics":" J'ai dix ans, j'suis fan de basket","duration":1972},
//     {"lyrics":" J'm'habille en petit américain","duration":2020},
//     {"lyrics":" Mon père, mon héros, m'a offert","duration":2007},
//     {"lyrics":" Les Jordan 8 avec les scratch","duration":1997},
//     {"lyrics":" Donc j'fais tout pour le rendre fier","duration":1992},
//     {"lyrics":" Quand il vient m'voir à tous les matchs","duration":1986},
//     {"lyrics":" J'rentre au collège, on m'traite de bourge","duration":2013},
//     {"lyrics":" Normal, mes chaussures coûtent une blinde","duration":2000},
//     {"lyrics":" J'veux plus les mettre, mon père s'énerve","duration":2003},
//     {"lyrics":" \"Toi, t'as tout, nous on n'avait rien\"","duration":2009},
//     {"lyrics":" J'ai 12 ans, j'fous l'bordel en cours","duration":1989},
//     {"lyrics":" Pour essayer d'me faire des potes","duration":2021},
//     {"lyrics":" Le prof de musique s'fout en l'air","duration":1989},
//     {"lyrics":" Il est au paradis des profs","duration":1996},
//     {"lyrics":" À 11 ans, j'voulais juste en avoir 13","duration":3019},
//     {"lyrics":" À 13 ans, j'étais pressé d'voir le reste","duration":4014},
//     {"lyrics":" Aujourd'hui, j'aimerais mieux qu'le temps s'arrête","duration":3999},
//     {"lyrics":" Ah, c'qui compte c'est pas l'arrivée, c'est la quête","duration":3954},
//     {"lyrics":" Souvent j'suis tombé amoureux","duration":2997},
//     {"lyrics":" Mais pour une fois, c'est réciproque","duration":2014},
//     {"lyrics":" J'abandonne lâchement tous mes potes","duration":2003},
//     {"lyrics":" J'vois plus qu'ma meuf, on fume des clopes","duration":1996},
//     {"lyrics":" 14 ans, j'suis juste un fantôme","duration":2005},
//     {"lyrics":" Du moins c'est c'que disent mes parents","duration":1995},
//     {"lyrics":" Chérie veut qu'j'traîne plus qu'avec elle","duration":2007},
//     {"lyrics":" Pourtant elle m'fait la gueule tout l'temps","duration":1998},
//     {"lyrics":" Vu qu'j'déménage, ça nous sépare","duration":1984},{"lyrics":" J'me dis qu'l'amour c'est surcoté","duration":2000},{"lyrics":" Mon frangin m'éclate au basket","duration":2008},{"lyrics":" Alors j'préfère abandonner","duration":2021},{"lyrics":" J'ai 15 ans, j'regarde Kate en boucle","duration":1980},{"lyrics":" J'traîne avec des gars comme Casper","duration":1989},{"lyrics":" Mon père est sévère avec moi","duration":2012},{"lyrics":" Donc j'le répercute sur mon frère","duration":1995},{"lyrics":" À 15 ans, j'voulais juste en avoir 16","duration":3047},{"lyrics":" À 16 ans, j'étais pressé d'voir le reste","duration":3984},{"lyrics":" Aujourd'hui, j'aimerais mieux qu'le temps s'arrête","duration":4022},{"lyrics":" Ah, c'qui compte c'est pas l'arrivée, c'est la quête","duration":3929},{"lyrics":" J'descends les marches, la peur au ventre","duration":3004},{"lyrics":" Pour intercepter mon bulletin","duration":2015},{"lyrics":" À la maison, c'est la guerre froide","duration":1999},{"lyrics":" On s'comprend plus, donc j'dis plus rien","duration":1992},{"lyrics":" J'ai 16 ans et j'passe par la fenêtre","duration":2016},{"lyrics":" Pour rejoindre les autres au skatepark","duration":2019},{"lyrics":" On boit des bières, on fume des joints","duration":1988},{"lyrics":" Et j'raconte tout ça dans mes raps","duration":1985},{"lyrics":" Les années passent, même un peu trop","duration":2001},{"lyrics":" Au point qu'j'ose plus chanter mon âge","duration":1999},{"lyrics":" Mon frangin fume quand j'mets la bague","duration":1989},{"lyrics":" Ma frangine anime le mariage","duration":2018},{"lyrics":" Les choses que j'ose dire à personne","duration":1992},{"lyrics":" Sont les mêmes qui remplissent des salles","duration":2002},{"lyrics":" Maman est là, mon père est fier","duration":1994},{"lyrics":" Et l'Univers est pas si mal","duration":1998},{"lyrics":" (L'Univers est pas si mal)","duration":1067},{"lyrics":" À 16 ans, j'voulais juste avoir 17","duration":3990},{"lyrics":" 17 ans, j'étais pressé d'voir le reste","duration":3986},{"lyrics":" Aujourd'hui, j'aimerais mieux qu'le temps s'arrête","duration":4021},{"lyrics":" Ah, c'qui compte c'est pas l'arrivée, c'est la quête","duration":2991},{"lyrics":" À cinq ans, j'voulais juste en avoir sept","duration":5003},{"lyrics":" À sept ans, j'étais pressé d'voir le reste","duration":3973},{"lyrics":" Aujourd'hui, j'aimerais mieux qu'le temps s'arrête","duration":4030},{"lyrics":" Ah, c'qui compte c'est pas l'arrivée, c'est la quête","duration":2993},{"lyrics":"","duration":3973}]}


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
    console.log(listeMots);
    stringMots = listeMots.join(' ')
    return stringMots;

}

let entreesClavier = [];


 
document.addEventListener('keydown', function(e) {
  e.preventDefault();
  if(canWrite){
    switch(e.key){
      case 'Enter':
        console.log(entreesClavier.join('').replace(/<\/?[^>]+(>|$)/g, ""));
        calculateScore(entreesClavier.join('').replace(/<\/?[^>]+(>|$)/g, ""), paroles[paroleTrou]);
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
        break;
      default:
        entreesClavier.push("<span class='fillLetter'>"+e.key+"</span>");
        document.getElementById("fillSpan").innerHTML = entreesClavier.join(''); 
    }


    if (e.key !== 'Enter') {
      if(e.key == 'Backspace'){
        
      }else{
      
      }
    } else {
      console.log(entreesClavier);
      
      
    }
  }
});






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
        document.getElementById("paroleCompleter").innerHTML = parolesTrou;
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

      //effet grapghique


      // For example, if you want to display the score in an element with id="score"
      document.getElementById('score').textContent = `Score: ${data.score}`;
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

    function editLetter(){
      console.log(index);
      if(index<typedLettersList.length){
        console.log(dropedParoles[index]);
        console.log(typedLettersList[index].innerText);
        if(dropedParoles[index]==typedLettersList[index].innerText){
          typedLettersList[index].style.color="#05E800"
        }else{
          typedLettersList[index].style.color="#F23E3E"
        }
        index+=1;
        if(typedLettersList[index].innerText==" "){
          time =0;
        }else{
          time = 500;
        }
        setTimeout(editLetter,time);
      }
    }

    editLetter();

}


