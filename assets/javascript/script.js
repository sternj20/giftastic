// dom variables

var buttons = $(".buttons");
var images = $(".images");
// array of strings that are topics for giphy images to be generated
var topics = ['house of cards', 'black mirror', 'silicon valley', 'tabla', 'martin'];

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
				//for each item in array create a new div
				var div = $("<div>");
				div.addClass('imgDiv');
				//create a new image
				var img = $("<img>");
				//data attr for still img
				img.attr("data-still", response.data[i].images.original_still.url);
				//data attr for rating
				img.attr("data-rating", response.data[i].rating);
				//data attr for gif
				img.attr("data-gif", response.data[i].images.original.url);
				//add the still src from giphy api to each img tag
				img.attr("src", response.data[i].images.original_still.url).addClass('image');
				//create rating for images
				var rating = $("<div>");
				rating.html("<b>Rating: </b>" + img.attr("data-rating")).addClass('rating');
				//append img to div
				div.append(img);
				//append rating to div
				div.append(rating);
				//append div to document
				$(".images").append(div);
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
	//when add new image button is pressed
	$(document).on('click', '.addImg', function(event){
		event.preventDefault();
		var newImg = ($(".newImg"));
		//push the name of new image to add to topics array
		topics.push(newImg.val());
		//clear input value
		newImg.val('');
		//call generate buttons function
		generateButtons();
	});

});
//function calls
generateButtons();