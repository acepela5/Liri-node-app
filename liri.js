require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require("axios");

var omdb = require('omdb');

// bandsintown
var getMeBands = function(artist="pink"){
 axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
     console.log(response.data[0]);
 })

}

// spotify
var spotify = new Spotify(keys.spotify);



var getArtistNames = function(artist) {
    return artist.name;
}

var getMeSpotify = function(songName) {

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        
        var songs = data.tracks.items
        for(var i=0; i<songs.length; i++){
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('----------------------------');
        }

});
}

// movie omdb
var getMeMovie = function(movieName) {
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(function(response){
        console.log(response.data);
        console.log(`Title: ${response.data.Title}`)
    })

    
    
    // omdb.search(movieName, function(err, movies){
    //     console.log(movieName);


    //     if(err){
    //         return console.log(err);
    //     }
    //     if(movies.length<1) {
    //         return console.log('No movies were found');
    //     }
    //     movies.forEach(function(movie){
    //         console.log('%s (%d)', movie.title, movie.year)
    //     })
    //     // console.log(err);
    //     // console.log(movie.title);
    //     // console.log('Title: ' + responses.data[0].title);
    //     // console.log('Year: ' + jsonData.Year);
    //     // console.log('Rated: ' + jsonData.Rated);
    //     // console.log('IMDB Rating: ' + jsonData.imdbRating);
    //     // console.log('Country: ' + jsonData.Country);
    //     // console.log('Language: ' + jsonData.Language);
    //     // console.log('Plot: ' + jsonData.Plot);
    //     // console.log('Actors: ' + jsonData.Actors);
    //     // console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
    //     // console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
        
    // })
}

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function(err, data){
     if (err) throw err;

     var dataArr = data.split(',');

     if (dataArr.length === 2) {
         pick(dataArr[0], dataArr[1]);
     }
     else if (dataArr.length === 1) {
         pick(dataArr[0]);
     }
});
}
// uses user input to 
var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'concert-this' :
            getMeBands(functionData);
            break;
        case 'spotify-this-song':
            getMeSpotify(functionData);
            break;
        case 'movie-this':
            getMeMovie(functionData);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};
// splice to add more words
runThis(process.argv[2], process.argv[3]);






