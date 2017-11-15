var app = angular.module('app',[]);
app.controller('MainCtrl', function($scope) {

  // $scope.seachAddress = function()
  // {
  //     alert($scope.txtAddress);
  // };
});
app.directive('googleMap',function() {
  return {
    restrict : 'E',
    template : '<div></div>',
    replace : true,
    link : function(scope,element,attrs) {

      var latLng = new google.maps.LatLng(45.5224104, -73.5739497);
      var mapProp = {
        center : latLng,
        zoom : 9,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      var mapObj = new google.maps.Map(element[0],mapProp);
      // var mapObj = new google.maps.Map(document.getElementById(attrs.id),mapProp);
      var marker = new google.maps.Marker({
        position : latLng,
        map : mapObj,
        Name : 'Montreal',
        Title : 'Glad to be here =)',
        animation : google.maps.Animation.BOUNCE
      });
      marker.setMap(mapObj);

      var geocoder = new google.maps.Geocoder();

      scope.seachAddress = function()
      {
          alert(scope.txtAddress);

          geocoder.geocode( { 'address': scope.txtAddress}, function(results, status)
          {
              if (status == google.maps.GeocoderStatus.OK)
              {
                  mapObj.setCenter(results[0].geometry.location);
                  var marker = new google.maps.Marker(
                  {
                      map: mapObj,
                      position: results[0].geometry.location
                  });
              }
              else
              {
                  alert("Geocode was not successful for the following reason: " + status);
              }
          });
      };




    }
  };
});