
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

// REQUIRE .env FILE
require("dotenv").config();
// REQUIRE MOMENT
var moment = require("moment");
// REQUIRE FILE SYSTEM
var fs = require("fs");
// REQUIRE AXIOS
var axios = require("axios");
// REQUIRE keys.js
var keys = require("./keys.js");
// INITIALIZE SPOTIFY API
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// INITIALIZE OMDB API

// MAYBE DONT NEED THESE / REMOVE
var omdb = (keys.omdb);
// INITIALIZE BANDS IN TOWN API
var bandsintown = (keys.bandsintown);

// SET UP USER INPUTS
var command = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

var userRequest = function(command,userQuery) {
    switch (command) {
        case "concert-this":
            findConcert();
            break;
        case "spotify-this-song":
            findSong();
            break;
        case "movie-this":
            movieThis();
            // axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
            //     function(response) {
            //     console.log("The movie's rating is: " + response.data.imdbRating);
            // });
            break;
        case "do-what-it-says":
            doThis(userQuery);
            break;
        default:
            console.log("Valid command required");
    };
}
userRequest(command,userQuery);

function findConcert(band) {
    var band = userQuery;
    var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
                function(response) {
                    console.log("==============================");
                    console.log(band.charAt(0).toUpperCase() + band.slice(1) + " is playing at:");
                    console.log("Venue: " + response.data[0].venue.name);
                    console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                    console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
                    console.log("==============================");
                });
}

function findSong(song) {
    var song = userQuery;
    spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
        console.log(response.tracks.items[0].album.artists[3]);
        // console.log(response.tracks.items[0].name);
        // console.log(response.tracks.items[0].album.name);
        // console.log(response.tracks.items[0].external_urls.spotify);
    })
    .catch(function(err) {
      console.log(err);
    });
}