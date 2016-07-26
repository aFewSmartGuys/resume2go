function normalize() {
	makeImageFullScreen();
	fixTopMargin();
}

function makeImageFullScreen() {

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
	document.getElementById("Experience").style.marginTop = imgHeight + "px";
}

$(document).ready(function() {
	setupScrolling();
});

function setupScrolling() {

	$("#educationButton").click(function() {
		$("html, body").animate({
			scrollTop: $("#Education").offset().top
		}, 500);
	});

	$("#experienceButton").click(function() {
		$("html, body").animate({
			scrollTop: $("#Experience").offset().top
		}, 500);
	});

	$("#skillsButton").click(function() {
		$("html, body").animate({
			scrollTop: $("#Skills").offset().top
		}, 500);
	});

	$("#contactButton").click(function() {
		$("html, body").animate({
			scrollTop: $("#Contact").offset().top
		}, 500);
	});

	$("#certificationsButton").click(function() {
		$("html, body").animate({
			scrollTop: $("#Certifications").offset().top
		}, 500);
	});

	$("#accomplishmentsButton").click(function() {
		$("html, body").animate({
			scrollTop: $("#Accomplishments").offset().top
		}, 500);
	});

	$("#samplesButton").click(function() {
		$("html, body").animate({
			scrollTop: $("#Samples").offset().top
		}, 500);
	});
}