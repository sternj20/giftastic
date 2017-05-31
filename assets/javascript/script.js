/*
Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. 
Your app should take the topics in this array and create buttons in your HTML.
Try using a loop that appends a button for each string in the array.
When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
	Add an event handler on the buttons
	Event handler should send an AJAX request to GIPHY API with the title of the button you clicked on 
	Return 10 static non animated gif images
	When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
	Under every gif, display its rating (PG, G, so on).

Only once you get images displaying with button presses should you move on to the next step.
Add a form to your page takes the value from a user input box and adds it into your topics array.
	form pushes to our array the value
	triggers a function that iterates through our array and adds buttons for each array

*/

// dom variables

var buttons = $(".buttons");
var images = $(".images");
// array of strings that are topics for giphy images to be generated
var topics = ['house of cards', 'black mirror', 'silicon valley', 'thirteen reasons why', 'martin'];

//iterates through our array and adds buttons for each array
function generateButtons(){
	//clears buttons that have already been generated
	buttons.empty();
	//iterates through our topics array
	for(var i = 0; i < topics.length; i++){
		//creates a button for each item in array
		var button = $("<button>");
		button.text(topics[i]).attr("data-name", topics[i]);
		button.addClass('button');
		//appends button to page
		buttons.append(button);
	}
}

function addGif(){
	images.empty();
	var name = $(this).attr("data-name");
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=dc6zaTOxFJmzC&limit=10';
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			//iterate through responses array
			for(var i = 0; i < response.data.length; i++){
				//for each item in array create a new img tag
				var img = $("<img>");
				//data attr for still img
				img.attr("data-still", response.data[i].images.original_still.url);
				//data attr for gif
				img.attr("data-gif", response.data[i].images.original.url);
				//add the still src from giphy api to each img tag
				img.attr("src", response.data[i].images.original_still.url).addClass('image');
				//append img to document
				$(".images").append(img);
			}
		});
}

//event handlers
$(document).ready(function() {
	//when any button is pressed trigger add gif function
	$(document).on('click', '.button', addGif);
	//when img is pressed, turn img from static into gif
	$(document).on('click', '.image', function(event){
		//if img clicked is still
		if(this.src === $(this).attr("data-still")){
			//turn into a gif
			this.src = $(this).attr('data-gif');
		} else {
			//else turn into still 
			this.src = $(this).attr("data-still");
		}
	});

});
//function calls
generateButtons();