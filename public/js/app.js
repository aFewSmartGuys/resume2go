var app = angular.module("app", ["ngSanitize"]);

app.controller("mainCtrl", ['$scope', '$http', mainCtrl]);

app.directive("heading", headingDirective);
app.directive("content", contentDirective);

app.filter("spacesToUnderscores", spacesToUnderscores);


function mainCtrl($scope, $http) {
	// Get the content from the backend
	var content;
	
	$http({
		method: "GET",
		url: "/content"
	}).then(function(data){
		content = new Resume.classes.Content(data.data);
		var dp = content.getDisplayPortfolio();

		$scope.title = dp.meta.title;
		$scope.mainImagePath = dp.meta.mainImagePath;
		$scope.headings = content.getHeadings(dp.meta.id);

		$scope.contentList = dp.content;
	}, function(err) {
		console.log("There was an error loading content");
	});
	$scope.scrollToContent = function(name){
	    $('html, body').animate({
	        scrollTop: $("#"+Resume.utils.spacesToUnderscores(name)).offset().top
		}, 500);
	};
}

function spacesToUnderscores() {
	return Resume.utils.spacesToUnderscores;
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
		template: "<div id='{{content.title | spacesToUnderscores}}' class='textElements'>\
			<h2 class='contentHeader'>{{content.title}}</h2>\
			<div class='contentBox' ng-bind-html='content.content'></div>\
		</div>"
	};
}