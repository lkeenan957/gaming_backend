const igdb = require('igdb-api-node').default;

const client = igdb('b0b518b52239e302279cb9e719a371c8');
var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
// var querystring = require('querystring');
var searchText = "";


// on the request to root (localhost:3000/)
app.get('/search', function (req, res) {
    // res.send('<b>My</b> first express http server');
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.query.search);
    
    searchText = req.query.search;
    // searchText = searchText.substring(searchText.indexOf(":")+1);
    client.games({
        fields: ['name', 'summary', 'storyline', 'total_rating', 'aggregated_rating', 
        'first_release_date', 'release_dates.date', 'popularity', 'url', 'category', 
        'screenshots', 'videos.video_id', 'genres'], // Return all fields
        limit: 10, // Limit to 5 results
        scroll: 1, // Index offset for results
        // search: 'zelda',
        search: searchText,
    	order: 'aggregated_rating:desc'
        
    }).then(response => {
        // response.body contains the parsed JSON response to this query
        console.log('response.body', searchText);
        res.send(response.body);
    }).catch(error => {
        throw error;
    });
});

//this is the ranking for 2017

app.get('/', function (req, res) {
    // res.send('<b>My</b> first express http server');
    res.setHeader('Access-Control-Allow-Origin', '*');

    client.games({
        fields: ['summary', 'storyline', 'name', 'total_rating', 'aggregated_rating', 'first_release_date', 
        'release_dates.date', 'videos.video_id', 'genres'], // Return all fields
        limit: 10, // Limit to 5 results
        offset: 15, // Index offset for results
        // search: 'zelda',
        filters: { 
        	'aggregated_rating-gte' : '80',
        'first_release_date-gt': '2016-12-31',
        'first_release_date-lt': '2018-01-01'
    	},
    	order: 'aggregated_rating:desc'
        
    }).then(response => {
        // response.body contains the parsed JSON response to this query
        // console.log('response.body', response);
        res.send(response.body);
    }).catch(error => {
        throw error;
    });
});

app.get('/characters', function (req, res) {
    // res.send('<b>My</b> first express http server');
    res.setHeader('Access-Control-Allow-Origin', '*');
    client.characters({
        fields: '*', // Return all fields
        limit: 10, // Limit to 5 results
        offset: 15, // Index offset for results
        filters: {'gender':'1'}
        
    }).then(response => {
        // response.body contains the parsed JSON response to this query
        //console.log('response.body', response.body);
        // res.send(response.body);
    }).catch(error => {
        throw error;
    });

});

// // On localhost:3000/welcome
// app.get('/welcome', function (req, res) {
//     res.send('<b>Hello</b> welcome to my http server made with express');
// });

// // Change the 404 message modifing the middleware
// app.use(function(req, res, next) {
//     res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
// });

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.'); 
});