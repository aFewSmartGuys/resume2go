var app = angular.module("app", ["ngSanitize"]);

app.controller("titleController", title);
app.controller("topController", topController);
app.controller("contentController", contentController);

app.directive("heading", headingDirective);
app.directive("content", contentDirective);

// Get the content from the backend
var content = new Rezoomae.classes.Content({});

$.getJSON("/content", function(data){
	console.log(data);
	content.setContent(data);
});

function title($scope) {
	$scope.title = content.getTitle();
}

function topController($scope) {
	$scope.title = content.getTitle();
	$scope.mainImagePath = content.getMainImage();
	$scope.headings = content.getHeadings();
	$scope.scrollToContent = function(name){
	    $('html, body').animate({
	        scrollTop: $("#"+name).offset().top
		}, 500);
	};
}

function contentController($scope) {
	$scope.contentList = content.contentList();
}

function headingDirective() {
	return {
		scope: {
			name: "=",
			clicked: '&'
		},
		restrict: "E",
		template: "<li><a href='' id='{{name}}Button' ng-click='clicked()'>{{name}}</a></li>"
	};
}

function contentDirective() {
	return {
		restrict: "E",
		template: "<div id='{{content.title}}' class='textElements'>\
			<h2 class='contentHeader'>{{content.title}}</h2>\
			<div class='contentBox' ng-bind-html='content.content'></div>\
		</div>"
	};
}