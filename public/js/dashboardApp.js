var app = angular.module("app", []);

app.controller("mainCtrl", ['$scope', '$http', mainCtrl]);

function mainCtrl($scope, $http) {
	// Get the content from the backend
	var content;

	$http({
		method: "GET",
		url: "content"
	}).then(function(data) {
		var response = data.data;
		content = new Rezoomae.classes.Content(response.portfolios);
		
		$scope.ids = content.getIds();
		$scope.currId = !!$scope.ids ? $scope.ids[0] : "";
		$scope.displayPortfolio = response.displayPortfolio || "";
		$scope.meta = content.findById($scope.currId).meta;
		$scope.content = content.findById($scope.currId).content;
	}, function(err) {
		console.log(err);
	});

	$scope.save = function() {
		content.update({meta:$scope.meta, content:$scope.content});
		$scope.ids = content.getIds();
		$scope.currId = $scope.meta.id;
		var sendData = {
			portfolio: content.toString($scope.currId),
			displayPortfolio: $scope.displayPortfolio
		};
		//spinner
		$http({
			method: "POST",
			url: "save",
			headers: {
				"Content-Type": "application/json"
			},
			data: sendData
		}).then(function(data) {}, function(err) {
			console.log(err.data);
		});
	};

	$scope.newSection = function() {
		$scope.content.push({title:"", content: ""})
	};

	$scope.removeSection = function(section) {
		$scope.content.splice($scope.content.indexOf(section), 1)
	};

	$scope.viewPortfolio = function() {
		//save the current portfolio first???
		var portfolio = content.findById($scope.currId);
		$scope.meta = portfolio.meta;
		$scope.content = portfolio.content;
	};

	$scope.updateDisplayPortfolio = function() {
		//spinner
		$http({
			method: "POST",
			url: "displayPortfolio/update",
			headers: {
				"Content-Type": "application/json"
			},
			data: {pid:$scope.displayPortfolio}
		}).then(function(data) {}, function(err) {
			console.log(err.data);
		});
	};
}
