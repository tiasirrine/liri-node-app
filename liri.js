//import { twitter, spotify } from "./keys.js";

require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//takes in arguments from command line
var command = process.argv[2];
// this variable will store the data we just looped through on command line
//create for loop that will take in all arguments from command line and input into one variable


//code that will pull tweets
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

if (command === "my-tweets") {
    getTweets();
}
