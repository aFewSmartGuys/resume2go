var app = angular.module("app", []);

app.controller("titleController", title);
app.controller("topController", topController);
app.controller("contentController", contentController);

app.directive("heading", headingDirective);
app.directive("content", contentDirective);

var config = {
	meta:{
		title: "Name Here",
		mainImageUrl: "http://p1.pichost.me/i/74/1988702.jpg",
		phone: "(555) 123-1234"
	},
	content: {
		Education:"ASDFASDF",
		Experience:"asdf",
		Skills:"eqrqewrqwer",
		Contact:"zxcvzxcvzxcv"
	}
}

function title($scope) {
	$scope.title = config.meta.title;
}

function topController($scope) {
	$scope.title = config.meta.title;
	$scope.mainImageUrl = config.meta.mainImageUrl;
	$scope.headings = Object.keys(config.content);
}

function contentController($scope) {
	$scope.contentList = Object.keys(config.content).map(function (key) {
		return {
			title:key,
			content:config.content[key]
		};
	});
}

function headingDirective() {
	return {
		restrict: "E",
		template: "<li><a href='#{{heading}}' id='{{heading}}Button'>{{heading}}</a></li>"
	};
}

function contentDirective() {
	return {
		restrict: "E",
		template: "<div id='{{content.title}}' class='textElements'>\
			<h2>{{content.title}}</h2>\
			<ul>\
				<li>{{content.content}}<li>\
			</ul>\
		</div>"
	};
}