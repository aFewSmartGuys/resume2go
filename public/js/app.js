var app = angular.module("app", []);

app.controller("titleController", title);
app.controller("topController", topController);
app.controller("contentController", contentController);

app.directive("heading", headingDirective);
app.directive("content", contentDirective);

var config = {
	meta:{
		title: "Name Here",
		mainImagePath: "http://p1.pichost.me/i/74/1988702.jpg",
		phone: "(555) 123-1234"
	},
	content: [
		{ Education : "Test"},
		{ Work : "Test12"},
		{ Expericensad : "Test"}
	]
}

function title($scope) {
	$scope.title = config.meta.title;
}

function topController($scope) {
	$scope.title = config.meta.title;
	$scope.mainImagePath = config.meta.mainImagePath;
	$scope.headings = config.content.map(function(o){return Object.keys(o)[0];});
	$scope.scrollToContent = function(name){
	    $('html, body').animate({
	        scrollTop: $("#"+name).offset().top
		}, 500);
	}

}

function contentController($scope) {
	$scope.contentList = config.content.map(function (obj) {
		return {
			title:Object.keys(obj)[0],
			content:obj[Object.keys(obj)]
		};
	});
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
			<div class='contentBox'>{{content.content}}</div>\
		</div>"
	};
}