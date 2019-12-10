

var listen = new p5.SpeechRec('en-US');  //using the speech library making new object
listen.continuous = true; //keeps listening (not just once)
listen.interimResults = false; //watches for user to pause
listen.onResult = showResult; //performs showResult 


//nytimes api link cut up so that I can get and use input as date
var nytBase = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?facet=true&begin_date='; 
var nyt2 = '&end_date=';
var nytKey = '&api-key=ipc6mSQAIusgjG0I9fj0W3LX6upgUuG4';

var gifBase = 'http://api.giphy.com/v1/gifs/search?&api_key=ZT9A3yvIA01CS7vifGuQ61VR24TaTHAY&q=';


//global arrays to be used later
let word = [];
let circs = [];
let daet = [];

function setup() {
	createCanvas(windowWidth, windowHeight-100);
	listen.start(); //starts listening
	createElement('h1', 'When is your birthday (YYYYMMDD)?'); //inside html creates heading
	//frameRate(10);
	
}

function showResult() {
	var day = listen.resultString; //result of first saying (which will be anwswer to question abiut birthday)
	var date = day.replace(/\s/g, ""); //gets rid of any spacing between numbers
	//console.log(date);
	createElement('h4', date); //displays the date as a heading
	daet.push(date); //adds date value to daet array

	var regX = /\d/; //looks for digits
	var regXFin = /\b(\w*I'mfinished\w*)\b/; //looks for string I'mfinished after user says it
	if (regX.test(date)) { //if what user said is numbers
		var url = nytBase + date + nyt2 + date + nytKey; //uses as input to form NYTimes api link
		loadJSON(url, headlines); //loads from url based on headlines function
	} else if (regXFin.test(date)) { //if what user said is I'm finished
		for (var i=0; i < word.length; i++){
			var gifUrl = gifBase + word[i]; //uses input to complete giphy api url
			loadJSON(gifUrl, gifs); //loads from giphy url using gifs function
			listen.continuous = false; //doesnt work
		}
	} else { //if user is saying anything else, counts as keyword
		word.push(date); //add to words array
		console.log(word);
		for (var i=0; i < word.length; i++){
			var gifUrl = gifBase + word[i]; //makes complete giphy api urls
			
		}
		
	}
	
}

function headlines(data) {
  	var titles = data.response.docs; //path in api

  	for (var i=0; i < titles.length; i++) {
    	createElement('h3', titles[i].abstract); //path to get detailed headline and displays headlines as headings
  		}	

  	createElement('h1', 'Ready to choose your keywords? Go ahead, I\'m listening. Say "I\'m finished" when you are done and scroll up.');//creates headings on html page
  	
}



function gifs(info) {
	background(0); //creates black canvas on top

	for (var i=0; i < 3; i++) {

  		var imej = createImg(info.data[i].images.fixed_height_downsampled.url); //creates img (in dom library not the same as createImage)

  		imej.position(random(4)*300, 20*random(25));//randomly places img on canvas

  		circs.push(imej); //adds current imej into circs array



	}


}

let tsize = [32,75,21,82]; //fontsizes for text

function mousePressed() { //when mouse pressed, adds keywords in random order, size, and color

	var randomArraywchoice = Math.floor(Math.random() * word.length); //creates random number based on number of keywords said
	var randArryTsize = Math.floor(Math.random() * tsize.length); //creates random number from 0 to 3

	textSize(tsize[randArryTsize]); //random size
	text(word[randomArraywchoice],mouseX,mouseY); //random keyword where mouse is
	fill(random(250), random(250), random(150), random(200)); //random color

    
}


