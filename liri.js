

require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var songTitle = ""
var movieTitle = ""

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//takes in arguments from command line index 2
var command = process.argv[2];

// this variable will store the data we loop through on the command line

var argv = process.argv;

//function for displaying our last 20 tweets, pulled from twitter api
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
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
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
