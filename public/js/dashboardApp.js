var app = angular.module("app", []);

app.controller("mainCtrl", mainCtrl);

function mainCtrl($scope) {
	// Get the content from the backend
	var content;

	$.getJSON("/content", function(data) {
		content = new Rezoomae.classes.Content(data);

		$scope.meta = content.meta;
		$scope.content = content.getContent();
	});

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
		content.setContent({meta:$scope.meta, content:$scope.content});
		console.log(content.toString());
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
