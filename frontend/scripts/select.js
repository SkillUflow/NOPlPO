let titles = document.getElementsByClassName("song_title");
let artist = document.getElementsByClassName("song_artist");
let annee = document.getElementsByClassName("song_year");

titles[0].innerText = "tuile";
artist[0].innerText = "basketball";
annee[0].innerText = "2000";

titles[1].innerText = "gras";
artist[1].innerText = "chips";
annee[1].innerText = "1999";




let song_name = " J'ai cherché";

let button = document.getElementById("song_button");

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
    console.log(data);
    //titles[0].innerText = data.name;

  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching data: ', error);
  });
