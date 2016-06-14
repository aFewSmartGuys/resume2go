var app = angular.module("app", ["ngSanitize"]);

app.controller("mainCtrl", ['$scope', '$http', mainCtrl]);

app.directive("heading", headingDirective);
app.directive("content", contentDirective);


function mainCtrl($scope, $http) {
	// Get the content from the backend
	var content;
	
	$http({
		method: "GET",
		url: "/content"
	}).then(function(data){
		content = new Rezoomae.classes.Content(data.data);
		$scope.title = content.getTitle();
		$scope.mainImagePath = content.getMainImage();
		$scope.headings = content.getHeadings();

		$scope.contentList = content.getContent();
	}, function(err) {
		console.log("There was an error loading content");
	});
	$scope.scrollToContent = function(name){
	    $('html, body').animate({
	        scrollTop: $("#"+name).offset().top
		}, 500);
	};
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