// Goole Maps API version
 // basic markers

// -----> this worked
// get var from Flask and convert to JS
// var crimes = '{{ crimes }}';

// either load from backend 
// console.log(crimes);

// or load from cached JSON

// var loadJSON = function(id)
// {
//     var url = '/static/data/' + id + '.json';
//     $.getJSON(url).success(function(data) {
//         return data;
//     })
//     .error(function(err) {
//          alert('Cannot load JSON', err);     
//     });
// };

// crimes = loadOverlay('crimes');

function initMap() {

    var montreal_center = new google.maps.LatLng(45.52605, -73.59505);

    var mapProp= {
        center: montreal_center,
        zoom: 12,
        scrollwheel: true,
        draggable: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var mapElement = document.getElementById("map");
    var map = new google.maps.Map(mapElement, mapProp);

    // setup first marker on center
    var centerMarker = new google.maps.Marker({
        position: montreal_center
    });
    centerMarker.setMap(map);

    // loop through data points and set up marker
    var markers = [];

    // data_points = loadOverlay('crimes_lat_long');
    // console.log(data);
    // console.log(crimes);

    

    // {% for crime in crimes %}
    for (var i in crimes)
    {
        // console.log(crimes[i]);

        crime = crimes[i];
        var new_marker_position = {lat: crime['LAT'], lng: crime['LONG']};

        var new_marker = new google.maps.Marker({
            position: new_marker_position,
            map: map,
            title: crime.CATEGORIE ,
            label: "1" ,
            html: '<div>IT WORKS!</div>'
        });
        markers.push(new_marker);

        //string for info window
        var infowindow = new google.maps.InfoWindow({});

        //this one works - puts a listener to this current marker
        google.maps.event.addListener(new_marker,'click', function() {
            infowindow.setContent(this.html);
            infowindow.open(map, this);
        });
    }
    // {% endfor %}
};








