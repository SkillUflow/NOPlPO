var sectionParoles = document.getElementById("ParolesSection");



function generateTrou(parole){
    listeMots = parole.split(" ");
    nbMots = listeMots.length;
    let placeMot = Math.round(Math.random()*((nbMots-1)-1)+1);
    if(placeMot==0){placeMot = 1};
    listeMots[placeMot-1]="_".repeat(listeMots[placeMot-1].length);
    listeMots[placeMot+1]="_".repeat(listeMots[placeMot+1].length);
    listeMots[placeMot]="_".repeat(listeMots[placeMot].length);
    console.log(listeMots);
    stringMots = listeMots.join(' ')
    return stringMots;

}

let entreesClavier = [];


function listenKeyboard() {
 
  document.addEventListener('keydown', function(e) {
   
    if (e.key !== 'Enter') {

      entreesClavier.push(e.key);
    } else {
       console.log(entreesClavier);
      entreesClavier = []; 
    }
  });
}




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
    }
    
}

afficherParole();   

