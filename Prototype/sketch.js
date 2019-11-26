//loads headlines and gifs
//must figure out how to get nytimes API to work with user input for the date variable
//I'm trying to use the p5.speech library to get the user's birthday and use that as an input to the nytimes api url

var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&begin_date=19980519&end_date=19980519&api-key=ipc6mSQAIusgjG0I9fj0W3LX6upgUuG4';
var nytBase = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&begin_date=';
var nyt2 = '&end_date=';
var nytKey = '&api-key=ipc6mSQAIusgjG0I9fj0W3LX6upgUuG4';
var date = '19980519';
var url = nytBase + date + nyt2 + date + nytKey;


var gifBase = 'http://api.giphy.com/v1/gifs/search?&api_key=ZT9A3yvIA01CS7vifGuQ61VR24TaTHAY&q=';
var headline = 'atm';
var gifUrl = gifBase + headline;

function setup() {
  noCanvas();
  loadJSON(url, headlines);
  loadJSON(gifUrl, gifs);
}

function headlines(data) {
  var titles = data.response.docs;

  for (var i=0; i < titles.length; i++) {
    createElement('h1', titles[i].abstract);
  }
}

function gifs(info) {

  for (var i=0; i < info.data.length; i++) {
    createImg(info.data[i].images.original.url);
  }
}


// var listen = new p5.SpeechRec('en-US');
// listen.continuous = true;
// listen.interimResults = false;
// listen.onResult = showResult;

// var nytBase = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&begin_date=';
// var nyt2 = '&end_date=';
// var nytKey = '&api-key=ipc6mSQAIusgjG0I9fj0W3LX6upgUuG4';
// var url = nytBase + date + nyt2 + date + nytKey;


// function setup() {
// 	noCanvas();
// 	listen.start();
// 	createElement('h1', 'when is your birthday (YYYYMMDD)?');
// 	loadJSON(url, headlines);

// }


// function showResult() {
// 	background(0);
// 	var day = listen.resultString;
// 	console.log(day);
// 	var date = day.replace(/\s/g, "");
// 	console.log(date);
// 	createElement('h1', date);

// }

// function headlines(data) {
//   var titles = data.response.docs;

//   for (var i=0; i < titles.length; i++) {
//     createElement('h1', titles[i].abstract);
//   }
// }

// function gifs(info) {

//   for (var i=0; i < info.data.length; i++) {
//     createImg(info.data[i].images.original.url);
//   }
// }



