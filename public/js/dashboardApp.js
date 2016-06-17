var app = angular.module("app", []);

app.controller("mainCtrl", ['$scope', '$http', mainCtrl]);

function mainCtrl($scope, $http) {
	// Get the content from the backend
	var content;

	$http({
		method: "GET",
		url: "content"
	}).then(function(data) {
		content = new Rezoomae.classes.Content(data.data);
		
		$scope.currId = "";
		$scope.ids = content.getIds();
		
		$scope.meta = content.findById($scope.currId).meta;
		$scope.content = content.findById($scope.currId).content;
	}, function(err) {
		console.log("Error getting content");
	});

	$scope.save = function() {
		content.update({meta:$scope.meta, content:$scope.content});
		$scope.ids.push($scope.meta.id);
		$scope.currId = $scope.meta.id;
		//spinner
		$http({
			method: "POST",
			url: "save",
			headers: {
				"Content-Type": "application/json"
			},
			data: content.toString($scope.currId)
		}).then(function(data) {
			console.log(data);
			console.log("saved");
		}, function(err) {
			console.log(err.data);
		});
	};

	$scope.newSection = function() {
		$scope.content.push({title:"", content: ""})
	};

	$scope.removeSection = function(section) {
		$scope.content.splice($scope.content.indexOf(section), 1)
	};

	$scope.viewPortfolio = function(id) {
		//save the current portfolio first???
		$scope.meta = content.findById(id).meta;
		$scope.content = content.findById(id).content;
	};
}
