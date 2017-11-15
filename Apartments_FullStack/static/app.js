var app = angular.module('app', []);

// solved conflict with {{}} of jinja, now we use [[]] for angular expressions
app.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);


// var RESOUCE_URL = 'https://jsonplaceholder.typicode.com/posts/1/comments';

// var RESOUCE_URL = 'https://api.myjson.com/bins/t99hh';
var RESOUCE_URL = 'http://127.0.0.1:9402/apartments'

app.controller('MyCtrl', ['$scope', 'MySvc', function ($scope, MySvc) {
    // on init, load marker points from JSON file
    MySvc.fetchPoints()
        .then(function (response) {
            $scope.points = response.data;
        }, function (err) {
            console.log(err);
        });
}]);

app.service('MySvc', ['$http', '$q', function ($http, $q) {
    this.fetchPoints = function () {
        return $http.get(RESOUCE_URL);
    };


    this.fetchAddressPoints = function () {
        return $http.get(RESOUCE_URL);
    };
}]);


app.directive('googleMap', ['MySvc', function (MySvc) {
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function (scope, element, attrs) {

            var latLng = new google.maps.LatLng(45.5224104, -73.5739497);
            var mapProp = {
                center: latLng,
                zoom: 12,
                scrollwheel: false,              // *** disable scroll on map when scroll on page
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: false,                // up to here ***
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var mapObj = new google.maps.Map(element[0], mapProp);
            var geocoder = new google.maps.Geocoder();

            // load from HTTP
            // put markers in the map
            // mapObj.setCenter(results[0].geometry.location);

            MySvc.fetchAddressPoints()
                .then(function (response) {
                    scope.addressPoints = response.data;

                    var markers = [];

                    // for each marker
                    if (scope.addressPoints) {
                        // console.log(scope.addressPoints);
                        for (var point in scope.addressPoints) {
                            // console.log(point);
                            var marker = new google.maps.Marker(
                                {
                                    map: mapObj,
                                    position: new google.maps.LatLng(scope.addressPoints[point].LAT, scope.addressPoints[point].LONG),
                                    icon: "http://res.cloudinary.com/dg93kyq63/image/upload/v1503374677/m/house.png",
                                    title: 'A',
                                    label: 'L',
                                    html: '<div>Some stuff</div>'

                                    // title: crime.CATEGORIE ,
                                    // label: "A" ,
                                    // html: '<div>Apartment</div>'

                                    // position: results[0].geometry.location,
                                    // animation : google.maps.Animation.DROP,
                                    // animation : google.maps.Animation.BOUNCE
                                    // Name: searchTxtAddress,
                                    // Title: searchTxtAddress
                                });
                            markers.push(marker);

                            // INFO WINDOW
                            var infowindow = new google.maps.InfoWindow({});

                            google.maps.event.addListener(marker, 'click', function () {
                                infowindow.setContent(this.html);
                                infowindow.open(mapObj, this);
                            });
                        }

                        // add a marker clusterer to manage the markers
                        var markerCluster = new MarkerClusterer(mapObj, markers,
                            // {imagePath: '../static/libaries/images/m'});
                            {
                                // imagePath: "http://res.cloudinary.com/dg93kyq63/image/upload/v1497575122/m/m"		// earthquake
                                imagePath: "http://res.cloudinary.com/dg93kyq63/image/upload/v1503375142/m/m"
                            }
                        );
                    }
                }, function (err) {
                    console.log(err);
                });

        }
    }
}]);