var app = angular.module("app", []);

app.controller("mainCtrl", ["$scope", "$http", mainCtrl]);

function mainCtrl($scope, $http) {
	// Get the content from the backend
	var content;
	var spinner = '<i class="fa fa-spinner" aria-hidden="true"></i>';

	$http({
		method: "GET",
		url: "/user/content"
	}).then(function(data) {
		var response = data.data;
		window.content = content = new Resume.classes.Content(response.portfolios);
		
		$scope.displayPortfolio = response.displayPortfolio || "";
		$scope.ids = content.getIds();
		$scope.currId = $scope.displayPortfolio.length > 0 ? $scope.displayPortfolio : "";
		$scope.meta = content.getMeta($scope.currId);
		$scope.content = content.getContent($scope.currId);
	}, function(err) {
		console.log(err);
	});

	$scope.save = function() {
		content.update({meta:$scope.meta, content:$scope.content});
		$scope.ids = content.getIds();
		$scope.currId = $scope.meta.id;
		//spinner
		$http({
			method: "POST",
			url: "/user/save",
			headers: {
				"Content-Type": "application/json"
			},
			data: content.toString($scope.currId)
		}).then(function(data) {
			console.log(data);
		}, function(err) {
			console.log(err.data);
		});
	};

	$scope.deletePortfolio = function(id) {
		$http({
			method: "POST",
			url: "/user/portfolio/delete",
			headers: {
				"Content-Type": "application/json"
			},
			data: {id:id}
		}).then(function(data) {
			console.log(data);
			$scope.ids.splice($scope.ids.indexOf(id), 1);
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

	$scope.viewPortfolio = function() {
		//save the current portfolio first???
		$scope.meta = content.getMeta($scope.currId);
		$scope.content = content.getContent($scope.currId);
	};

	$scope.updateDisplayPortfolio = function(id) {
		$scope.displayPortfolio = id;
		//spinner
		$http({
			method: "POST",
			url: "/user/displayPortfolio/update",
			headers: {
				"Content-Type": "application/json"
			},
			data: {pid:$scope.displayPortfolio}
		}).then(function(data) {}, function(err) {
			console.log(err.data);
		});
	};
}