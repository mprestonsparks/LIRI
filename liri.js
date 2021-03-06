
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

// SET UP USER INPUTS
var command = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");


var userRequest = function(command,userQuery) {
    switch (command) {
        case "concert-this":
            findConcert(userQuery);
            break;
        case "spotify-this-song":
            findSong(userQuery);
            break;
        case "movie-this":
            findMovie(userQuery);
            break;
        case "do-what-it-says":
            doThis();
            break;
        default:
            console.log("\n==============================\n");
            console.log("**VALID COMMAND REQUIRED**");
            console.log("Enter one of the following commands: \n");
            console.log("concert-this <BAND NAME>");
            console.log("spotify-this-song <SONG NAME>");
            console.log("movie-this <MOVIE NAME>");
            console.log("\n==============================\n");

    };
}

// Call userRequest function
userRequest(command,userQuery);


function findConcert() {
    var band = userQuery;
    var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function(response) {
            console.log("\n==============================\n");
            console.log(band.charAt(0).toUpperCase() + band.slice(1) + " is playing at:\n");
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
            console.log("\n==============================\n");

            var logConcert =    "\n==============================\n" + 
                                band.charAt(0).toUpperCase() + band.slice(1) + " is playing at:\n" +
                                "Venue: " + response.data[0].venue.name + "\n" +
                                "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + "\n" +
                                "Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\n" +
                                "\n==============================\n"
            fs.appendFile("log.txt", logConcert, function(err) {
                if (err) throw err;
            });
        });
    }

function findSong() {
    if (!userQuery) {
        userQuery = "The Sign Ace of Base";
    }   var song = userQuery;
        spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            console.log("\n==============================\n");
            console.log('Spotify Results for "' + song.charAt(0).toUpperCase() + song.slice(1) + '":\n')
            console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
            console.log("Album Name: " + response.tracks.items[0].album.name);
            console.log("Track Name: " + response.tracks.items[0].name);
            console.log("Preview Track: " + response.tracks.items[0].external_urls.spotify);
            console.log("\n==============================\n");

            var logSong =   "\n==============================\n" +
                            'Spotify Results for "' + song.charAt(0).toUpperCase() + song.slice(1) + '":\n' +
                            "Artist Name: " + response.tracks.items[0].artists[0].name + "\n" +
                            "Album Name: " + response.tracks.items[0].album.name + "\n" +
                            "Track Name: " + response.tracks.items[0].name + "\n" +
                            "Preview Track: " + response.tracks.items[0].external_urls.spotify +
                            "\n==============================\n"
            fs.appendFile("log.txt", logSong, function(err) {
                if (err) throw err;
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    };

function findMovie() {
    if (!userQuery) {
        userQuery = "Mr. Nobody";
    }   var movie = userQuery;
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
            console.log("\n==============================\n");
            console.log('OMDB Results for "' + movie.charAt(0).toUpperCase() + movie.slice(1) + '":\n')
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("\n==============================\n");

            var logMovie =  "\n==============================\n" +
                            'OMDB Results for "' + movie.charAt(0).toUpperCase() + movie.slice(1) + '":\n' +
                            "Title: " + response.data.Title + "\n" +
                            "Released: " + response.data.Year + "\n" +
                            "IMDB Rating: " + response.data.imdbRating + "\n" +
                            "Rotten Tomato Rating: " + response.data.Ratings[1].Value + "\n" +
                            "Country: " + response.data.Country + "\n" +
                            "Language: " + response.data.Language + "\n" +
                            "Plot: " + response.data.Plot + "\n" +
                            "Actors: " + response.data.Actors +
                            "\n==============================\n"
            fs.appendFile("log.txt", logMovie, function(err) {
                if (err) throw err;
            });
        });
}

function doThis() {
    fs.readFile("random.txt", "utf8", function (error,data) {
        if (error) {
            return console.log(error);
        } else {
            console.log(data);
            var fileContent = data.split(",");
            command = fileContent[0];
            userQuery = fileContent[1];
            userRequest(command,userQuery);
        };
    });
};