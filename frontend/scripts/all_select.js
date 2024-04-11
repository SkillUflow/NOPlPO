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
  let epochArray = {};
  let genreArray = {};

  // AFFICHAGE PAR ARTISTE
  {
  data["songs"].forEach(song => {

    let artistsContainer = document.getElementById("artistsContainer");

    if (artistArray[song["artist"]]) {
      artistArray[song["artist"]].push(song["name"]);
    } else {
      artistArray[song["artist"]] = [song["name"]];
    }

  });

  for (let artist in artistArray) {
    let valeur = artistArray[artist];

    if(valeur.length > 1){
      var current_ArtistButton= document.createElement("button");
      current_ArtistButton.className = "button artist_btn";
      current_ArtistButton.innerText = artist;
      
      artistsContainer.appendChild(current_ArtistButton);

    }
  }
  }

  // AFFICHAGE PAR EPOQUE - à faire quand les bonnes années auront été mises
  {
  data["songs"].forEach(song => {

    let aepochContainer = document.getElementById("epochContainer");

    if (epochArray[song["year"]]) {
      epochArray[song["year"]].push(song);
    } else {
      epochArray[song["year"]] = [song];
    }
  });
  console.log(epochArray); 
  }

  // Idem pour le GENRE
}
