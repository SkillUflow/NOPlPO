// Import nav, footer

fetch('/assets/header.html').then(response => response.text()).then(html => document.getElementsByTagName('header')[0].innerHTML = html);
fetch('/assets/footer.html').then(response => response.text()).then(html => document.getElementsByTagName('footer')[0].innerHTML = html);


let songsContainer = document.getElementById("songsContainer");


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

  data["songs"].forEach(song => {
    
    var current_songButton= document.createElement("button");
    current_songButton.className = "song_button";
    
    // <p class="song_title"></p>
    var current_songTitle = document.createElement("p");
    current_songTitle.className = "song_title";
    current_songTitle.innerText = song["name"];


    
    // <p class="song_artist emphase"></p>
    var current_songArtist = document.createElement("p");
    current_songArtist.className = "song_artist emphase";
    current_songArtist.innerText = song["artist"];

    
    // <p class="song_year emphase"></p>
    var current_songYear = document.createElement("p");
    current_songYear.className = "song_year emphase";
    current_songYear.innerText = song["year"];

    current_songButton.appendChild(current_songTitle);
    current_songButton.appendChild(current_songArtist);
    current_songButton.appendChild(current_songYear);

    songsContainer.appendChild(current_songButton);
    current_songButton.addEventListener("click",function(){openSong(song["name"])});
   
  });
}

function openSong(songName){
  localStorage.setItem("songName",songName);
  window.location.href = "game.html";
}