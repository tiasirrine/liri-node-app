require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var songTitle = "";
var movieTitle = "";

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//takes in arguments from command line index 2
var command = process.argv[2];

// this variable will store the data we loop through on the command line

var argv = process.argv;

//function for twitter
var params = {screen_name: 'codingpadawan1', count: 20};

function getTweets(){

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    for (var i = 0; i<tweets.length; i++) {
        console.log(tweets[i].text)
        console.log(tweets[i].created_at);
    }
  }
    else {
        console.log(error);
    }
});

};

//fucntion for spotify API

function spotifySearch() {
    if (argv[3] === undefined) {
        songTitle = "The Sign, Ace of Base";
    } else {
        for (var i = 3; i < argv.length; i++) {
            if (i === argv.length - 1) {
                songTitle += argv[i];
            } else {
                songTitle += argv[i] + " ";
            }
        }
    }
    spotify.search({ 
        type: 'track', 
        query: songTitle 
        }).then(function(response) {
          
                console.log("Artist: " + JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2) +
                  "\nSong Name: " + JSON.stringify(response.tracks.items[0].name, null, 2) +
                  "\nPreview Link: " + JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify, null, 2) +
                  "\nAlbum: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));
              })
              .catch(function(err){
                  console.log(err);
              });
          
    }

    //function for request to OMDB API 



//console.log(queryURL);

    function movieSearch() {
        
       if (argv[3] === undefined){
            movieTitle = "Mr Nobody";
        } else {
            for (var i = 3; i < argv.length; i++) {
                if (i === argv.length - 1) {
                    movieTitle += argv[i];
                } else {
                    movieTitle += argv[i] + " ";
                }
            }
        }
        var queryURL = "http://www.omdbapi.com/?t="+ movieTitle +"&y=&plot=short&apikey=trilogy";
        request(queryURL, function(err, response, body){
            if (!err && response.statusCode === 200) {
                console.log(queryURL);
                console.log(movieTitle);
                console.log(JSON.parse(body));
                console.log(
                    "Title: " + JSON.parse(body).Title +
                    "/nYear: " + JSON.parse(body).Year
                )
            }
            else {
                console.log(err);
            }
        });
    }
    


  



//call to twitter function
if (command === "my-tweets") {
    getTweets();

}

 //call to Spotify Function
if (command === "spotify-this-song") {
    spotifySearch();
   
}

//call to OMDB API
if (command === "movie-this") {
    movieSearch();
}

//call to .txt file
//if (command === "do-what-it-says") {
  //  doThis();
//}