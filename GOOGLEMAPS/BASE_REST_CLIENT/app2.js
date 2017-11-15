var app = angular.module('app',[]);
// var RESOUCE_URL = 'https://jsonplaceholder.typicode.com/posts/1/comments';
var RESOUCE_URL = 'https://api.myjson.com/bins/t99hh';
// RESOUCE_URL = 'http://127.0.0.1:9402/apartments';

app.controller('MyCtrl', ['$scope','MySvc', function($scope, MySvc) {
	// on init, load marker points from JSON file
	MySvc.fetchPoints()
		.then(function(response) {
			$scope.points = response.data;
		}, function(err) {
			console.log(err);
		});


	// MySvc.fetchAddressPoints()
	// 	.then(function(response) {
	// 		$scope.addressPoints = response.data;
	// 	}, function(err) {
	// 		console.log(err);
	// 	});

}]);

// var config = {headers:  {
// 		'Access-Control-Allow-Origin': '*'
//     }
// };


app.service('MySvc', ['$http', '$q', function($http, $q) {
	this.fetchPoints = function() {
		// return $http.get(RESOUCE_URL, config);
		return $http.get(RESOUCE_URL);
	};


	this.fetchAddressPoints = function() {
		// return $http.get(RESOUCE_URL, config);
		return $http.get(RESOUCE_URL);
	};

	
		// .then(function(response) {

		// }, function(err) {
		// 	console.log("SERVICE ERROR: ", err);
		// });
}]);


app.directive('googleMap', ['MySvc', function(MySvc) {
       return {
           restrict: 'E',
           template: '<div></div>',
           replace: true,
           link: function (scope, element, attrs) {

               var latLng = new google.maps.LatLng(45.5224104, -73.5739497);
               var mapProp = {
                   center : latLng,
                   zoom : 12,
                   scrollwheel: false,              // *** disable scroll on map when scroll on page
                   navigationControl: false,
                   mapTypeControl: false,
                   scaleControl: false,
                   draggable: false,                // up to here ***
                   mapTypeId : google.maps.MapTypeId.ROADMAP
               };
               var mapObj = new google.maps.Map(element[0],mapProp);

               var geocoder = new google.maps.Geocoder();

               // load from HTTP
               // put markers in the map

               // mapObj.setCenter(results[0].geometry.location);

               	MySvc.fetchAddressPoints()
					.then(function(response) {
						scope.addressPoints = response.data;

		               // for each marker
		               if (scope.addressPoints)
		               {
		               		console.log(scope.addressPoints);
		               		for(var point in scope.addressPoints)
		               		{
		               		   console.log(point);
				               var marker = new google.maps.Marker(
				                   {
				                       map: mapObj,
				                       position: new google.maps.LatLng(scope.addressPoints[point].LAT, scope.addressPoints[point].LONG),
				                       // position: results[0].geometry.location,
				                       // animation : google.maps.Animation.DROP,
				                       animation : google.maps.Animation.BOUNCE
				                       // Name: searchTxtAddress,
				                       // Title: searchTxtAddress
				                   });	
		               		}
		               }



					}, function(err) {
						console.log(err);
					});








               // scope.seachAddress = function()
               // {
               //     var searchTxtAddress = scope.post.entityAddress;
               //     console.log(searchTxtAddress);

               //     if (!searchTxtAddress.toUpperCase().includes("MONTREAL"))
               //     {
               //         searchTxtAddress += " Montreal";
               //     }

               //     geocoder.geocode( { 'address': searchTxtAddress}, function(results, status)
               //     {
               //         if (status == google.maps.GeocoderStatus.OK)
               //         {
               //             console.log(google.maps.GeocoderStatus.OK);
               //             mapObj.setCenter(results[0].geometry.location);
               //             var marker = new google.maps.Marker(
               //                 {
               //                     map: mapObj,
               //                     position: results[0].geometry.location,
               //                     // animation : google.maps.Animation.DROP,
               //                     animation : google.maps.Animation.BOUNCE,
               //                     Name: searchTxtAddress,
               //                     Title: searchTxtAddress
               //                 });
               //         }
               //         else
               //         {
               //             alert("Geocode was not successful for the following reason: " + status);
               //         }
               //     });
               // };

           }



       }
    }]);