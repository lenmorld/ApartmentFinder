var app = angular.module('app',[]);
var RESOUCE_URL = 'https://jsonplaceholder.typicode.com/posts/1/comments';

app.controller('MyCtrl', ['$scope','MySvc', function($scope, MySvc) {
	// on init, load marker points from JSON file
	MySvc.fetchPoints()
		.then(function(response) {
			$scope.points = response.data;
		}, function(err) {
			console.log(err);
		});


}]);

app.service('MySvc', ['$http', '$q', function($http, $q) {
	this.fetchPoints = function() {
		return $http.get(RESOUCE_URL);
	};

	
		// .then(function(response) {

		// }, function(err) {
		// 	console.log("SERVICE ERROR: ", err);
		// });
}]);