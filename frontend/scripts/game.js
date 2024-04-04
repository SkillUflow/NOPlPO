var sectionParoles = document.getElementById("ParolesSection");


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
    if(lastParoleIndice==paroleTrou){
        console.log(paroles[paroleTrou]);
        document.getElementById("paroleCompleter").innerText = paroles[paroleTrou];
    }
    
}

afficherParole();   

