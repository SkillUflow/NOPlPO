// Votre clé API Musixmatch
const apiKey = '5b15ca56dcb34c7112a34b5a6232bc84';

// Les informations de la chanson pour laquelle vous souhaitez obtenir les paroles

// Construction de l'URL de l'API
const apiUrl = `https://api.musixmatch.com/ws/1.1/`

let request=apiUrl+'chart.tracks.get?apikey='+apiKey+'&page=1&page_size=3&country=fr&format=json&chart_name=mxmweekly'

//on a donc request = https://api.musixmatch.com/ws/1.1/chart.artist.get?apikey=5b15ca56dcb34c7112a34b5a6232bc84&format=json&callback=callback

// Utilisation de fetch pour faire la requête à l'API
fetch(request)
    .then(response => response.json())
    .then(data => { 
        if (data.message.header.status_code === 200) {
            let result = data.message.body.track_list[1].track.track_name + " - " + data.message.body.track_list[1].track.artist_name;
            console.log(result); // Affiche les paroles dans la console
        } else {
            console.log("juste non");
        }
    })
    .catch(error => console.error("Erreur lors de l'accès à l'API Musixmatch:", error));


