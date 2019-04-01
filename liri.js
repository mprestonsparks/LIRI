
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// OMDB Requests
// http://www.omdbapi.com/?apikey=[yourkey]&
// DOCS: http://www.omdbapi.com/
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Spotify Requests
// Client ID: 0e61c0dc70d84a4a969bde1e172366a2
// DOCS: https://www.npmjs.com/package/node-spotify-api

// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: <your spotify client id>,
//     secret: <your spotify client secret>
//   });
   
//   spotify
//     .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//     .then(function(data) {
//       console.log(data); 
//     })
//     .catch(function(err) {
//       console.error('Error occurred: ' + err); 
//     });
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  }
);
