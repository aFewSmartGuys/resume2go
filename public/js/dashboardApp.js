var app = angular.module("app", []);

app.controller("mainCtrl", mainCtrl);

// Get the content from the backend
var content = new Rezoomae.classes.Content();

$.getJSON("/content", function(data){
	console.log(data);
	content.setContent(data);
});

function mainCtrl($scope) {
	$scope.title = content.getTitle();
	$scope.mainImagePath = content.getMainImage();
	$scope.phone = content.getPhone();

	$scope.content = content.getContent();

	$scope.save = function() {
		//spinner
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				console.log(req.status);
				if (req.status == 200) {
					console.log(req.responseText);
				} else {
					console.log("Error", req.statusText);
				}
			}
		};
		req.open("POST", "/save");
		req.setRequestHeader("Content-Type", "application/json");
		req.send(content.toString());
	};
	$scope.newSection = function() {
		$scope.content.push({title:"", content: ""})
	};
	$scope.removeSection = function(section) {
		$scope.content.splice($scope.content.indexOf(section), 1)
	};
}

