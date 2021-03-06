  // The first parameter are the coordinates of the center of the map
  // The second parameter is the zoom level
  var map = L.map('map').setView([40.712, -74.006], 11);
  
  // {s}, {z}, {x} and {y} are placeholders for map tiles
  // {x} and {y} are the x/y of where you are on the map
  // {z} is the zoom level
  // {s} is the subdomain of cartodb
    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  });

    // It even opens up a popup when you click it!
    L.marker([40.712, -74.006]).addTo(map)
      .bindPopup("<strong>Henry Street School</strong>").openPopup();
  
    L.marker([{{ school.latitude }}, {{ school.longitude }}]).addTo(map)
        .bindPopup("<strong>Henry Street School</strong>").openPopup();
    
  // Now add the layer onto the map
  map.addLayer(layer);
              
              
              
