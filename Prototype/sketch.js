

var listen = new p5.SpeechRec('en-US');
listen.continuous = true;
listen.interimResults = false;
listen.onResult = showResult;

var nytBase = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&begin_date=';
var nyt2 = '&end_date=';
var nytKey = '&api-key=ipc6mSQAIusgjG0I9fj0W3LX6upgUuG4';

var gifBase = 'http://api.giphy.com/v1/gifs/search?&api_key=ZT9A3yvIA01CS7vifGuQ61VR24TaTHAY&q=';

let word = [];

function setup() {
	createCanvas(windowWidth, 100);
	//noCanvas();
	listen.start();
	createElement('h1', 'When is your birthday (YYYYMMDD)?');
	
}

function showResult() {
	var day = listen.resultString;
	var date = day.replace(/\s/g, "");
	console.log(date);
	createElement('h4', date);
	var regX = /\d/;
	var regXFin = /\b(\w*I'mfinished\w*)\b/;
	if (regX.test(date)) {
		var url = nytBase + date + nyt2 + date + nytKey;
		loadJSON(url, headlines);
	} else if (regXFin.test(date)) {
		for (var i=0; i < word.length; i++){
			var gifUrl = gifBase + word[i];
			loadJSON(gifUrl, gifs);
			listen.continuous = false; //doesnt work
		}
	} else {
		word.push(date);
		console.log(word);
		for (var i=0; i < word.length; i++){
			var gifUrl = gifBase + word[i];
			
		}
		
	}
	
}

function headlines(data) {
  	var titles = data.response.docs;

  	for (var i=0; i < titles.length; i++) {
    	createElement('h3', titles[i].abstract);
  		}	

  	createElement('h1', 'Ready to choose your keywords? Go ahead, I am listening. Say "I\'m finished" when you are done.');
  
}



function gifs(info) {
	//var imej = createImg(info.data[i].images.original.url);

  for (var i=0; i < 5; i++) {
  	var imej = createImg(info.data[i].images.fixed_height_downsampled.url);
  	console.log(info.data[i].images.fixed_height_downsampled.width);
  	imej.position(random(windowWidth-300),random(windowHeight-300));
  }
}



