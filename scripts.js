function normalize() {
	makeImageFullScreen();
	fixTopMargin();
	resumeButton();
}

function makeImageFullScreen() {
	// alert("you're hovering");

	myImg = document.getElementById("home1");

	if(window.innerHeight > window.innerWidth){
		myImg.style.height = window.innerHeight+ "px";
		myImg.style.width = (window.innerHeight*1.5) + "px";
	}

	else if(window.innerWidth / window.innerHeight > 1.5) {
		myImg.style.width = window.innerWidth+ "px";
		myImg.style.height = window.innerWidth/1.5 + "px";
	}

	else if(window.innerWidth / window.innerHeight < 1.5){
		myImg.style.height = window.innerHeight+ "px";
		myImg.style.width = (window.innerHeight*1.5) + "px";
	}

	else{
		myImg.style.height = window.innerHeight+ "px";
	}	
}

function fixTopMargin() {
    var imgHeight = document.getElementById("home1").height;

    document.getElementById("Education").style.marginTop = imgHeight + "px";
}

function resumeButton() {
	var resumeButton = document.getElementById("floatingLink");
	var myImg = document.getElementById("home1");

	resumeButton.top = (myImg.height - 20) + "px";
}

$(document).ready(function() {
	
	// resume button scroll functionality
	$("#floatingButton").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#Education").offset().top
		    }, 500);
		});

	$("#educationButton").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#Education").offset().top
		    }, 500);
		});

	$("#experienceButton").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#Experience").offset().top
		    }, 500);
		});

		$("#skillsButton").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#Skills").offset().top
		    }, 500);
		});

			$("#contactButton").click(function() {
	    $('html, body').animate({
	        scrollTop: $("#Contact").offset().top
		    }, 500);
		});
});