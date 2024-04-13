// Import nav, footer

fetch('/assets/header.html').then(response => response.text()).then(html => document.getElementsByTagName('header')[0].innerHTML = html);
fetch('/assets/footer.html').then(response => response.text()).then(html => document.getElementsByTagName('footer')[0].innerHTML = html);


fetch('/getAllSongsFromDB', {
  method: 'POST', // Specify the method
  headers: {
    // Content-Type header is important for server to know how to parse the body
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

.then(response => {
  if (!response.ok) {
    // If response is not ok, throw an error
    throw new Error('Network response was not ok');
  }
  return response.json(); // Parse the JSON in the response
})
.then(data => {
  afficherSongsInfos(data);
})
.catch(error => {
  // Handle any errors that occurred during the fetch
  console.error('Error fetching data: ', error);
})

async function afficherSongsInfos(data){

  let artistArray = {};
  let artistsContainer = document.getElementsByClassName("buttonContainer")[0];

  // AFFICHAGE PAR ARTISTE
  {
  data["songs"].forEach(song => {

    if (artistArray[song["artist"]]) {
      artistArray[song["artist"]].push(song);
    } else {
      artistArray[song["artist"]] = [song];
    }

  });

  for (let artist in artistArray) {
    let valeur = artistArray[artist];

    if(valeur.length > 1){
      var current_ArtistButton= document.createElement("button");
      current_ArtistButton.className = "button artist_btn";
      current_ArtistButton.innerText = artist;
      
      artistsContainer.appendChild(current_ArtistButton);

      current_ArtistButton.addEventListener("click",function(){toGame(data["songs"],0,artist)});
    }
  }
  }
  
  let epochArray = {};
  let epochContainer = document.getElementsByClassName("buttonContainer")[1];

  // AFFICHAGE PAR EPOQUE
  {
  data["songs"].forEach(song => {

    if (epochArray[song["year"]]) {
      epochArray[song["year"]].push(song);
    } else {
      epochArray[song["year"]] = [song];
    }
  });

  const groupedData = {};

  for (const year in epochArray) {
    const decade = Math.floor(year / 10) * 10;
    if (!groupedData[decade]) {
      groupedData[decade] = [];
    }
    groupedData[decade] = groupedData[decade].concat(epochArray[year]);
  }

  for (let decade in grouped  Data) {
    let valeur = groupedData[decade];
    
    if(valeur.length > 1){

      var current_EpochButton = document.createElement("button");
      current_EpochButton.className = "button epoch_btn";

      if(decade < 2000){
        let to_text_decade = decade.slice(2);
        current_EpochButton.innerText = "Années " + to_text_decade;
      }else{
        current_EpochButton.innerText = "Années " + decade;
      }
      
      epochContainer.appendChild(current_EpochButton);

      current_EpochButton.addEventListener("click",function(){toGame(groupedData[decade],1)});
    }
  }

  }

  let genreArray = {};
  let genreContainer = document.getElementsByClassName("buttonContainer")[2];

  // AFFICHAGE PAR GENRE
  {

  data["songs"].forEach(song => {

    let genreContainer = document.getElementById("genreContainer");

    if (genreArray[song["genre"]]) {
      genreArray[song["genre"]].push(song);
    } else {
      genreArray[song["genre"]] = [song];
    }
  });


  for (let genre in genreArray) {
    let valeur = genreArray[genre];

    if(valeur.length >1){
      var current_genreButton = document.createElement("button");
      current_genreButton.className = "button genre_btn";
      current_genreButton.innerText = genre;
      genreContainer.appendChild(current_genreButton);
      current_genreButton.addEventListener("click",function(){toGame(valeur,2,genre)});
      }
    }
  
  }

}

function toGame(data, type, param=0){
  // data : l'ensemble des morceaux 
  // type : est-ce qu'on souhaite un morceau selon son artiste, son année ou son style
  // param : le nom de l'artiste/l'année/le style

  let song_to_guess;
  let to_choose = [];

  switch(type){
    case 0: // Par artiste
    data.forEach(song => {
      if(song["artist"]==param){
        to_choose.push(song["name"]);
      }
    });
    break;

    case 1: // Par époque
    data.forEach(song => {
       to_choose.push(song["name"]);
    });
    break;

    case 2: // Par genre
    data.forEach(song => {
      if(song["genre"]==param){
        to_choose.push(song["name"]);
      }
    });
    break;
  }
  
  song_to_guess = to_choose[Math.floor(Math.random() * to_choose.length)];
  localStorage.setItem("songName",song_to_guess);
  window.location.href = "game.html";
}
