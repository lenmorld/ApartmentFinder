      // get var from Flask and convert to JS
      // var crimes = '{{ crimes }}';
         
      
                       
//      var mymap = L.map('map').setView([40.706213526877455, -74.0044641494751], 15);
//      L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', 
//                  { maxZoom: 18, 
//                   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
//      }).addTo(mymap);

    // It even opens up a popup when you click it!
    // L.marker([40.712, -74.006]).addTo(mymap)
    //  .bindPopup("<strong>Henry Street School</strong>").openPopup();
                    
    // alert(schools.length);
            
    // must cache this one in a javascript format for speed
       
    /*
    {% for crime in crimes %}
        L.marker([{{ crime.LAT }}, {{ crime.LONG}}]).addTo(mymap)
            .bindPopup("<strong>{{ crime.CATEGORIE }}</strong>").openPopup();
    {% endfor %}
    */
    
    
$(function() {
   
        // Base Layers
        
        var cartoURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
        var cartoAttrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';
        
        var carto = new L.TileLayer(cartoURL, 
               {
                    attribution: cartoAttrib
                });                                     
        
        var map = new L.Map('map', {
                    center: new L.LatLng(45.6016777507,	-73.5486926833),
                    zoom: 30,
                    layers: [carto]
                });

        // L.control.scale().addTo(map);
        // L.control.locate().addTo(map);
                       
                       
        // overlays
        
        var initRadius = 800;
        $('input.range').attr('value', initRadius);
        
        var coverageLayer = new L.GridLayer.MaskCanvas(
                {
                    opacity: 0.5,
                    radius: 70,
                    useAbsoluteRadius: true,
                    noMask: true,
                    lineColor: '#A00'
                });

          //coverageLayer.setData([[45.6016777507,-73.5486926833],[45.4449528402,-73.6769260449],[45.6350960394,-73.5028680349],[45.5050384522,-73.8405583618]]);
        
        
        
        
         // map.addLayer(coverageLayer);
        // map.fitBounds(coverageLayer.bounds);


        var loadOverlay = function(id)
        {
            var url = '/static/data/' + id + '.json';
            $.getJSON(url).success(function(data) {
                coverageLayer.setData(data);
                map.fitBounds(coverageLayer.bounds);
                map.addLayer(coverageLayer);
            })
            .error(function(err) {
                 alert('An error occured', err);     
            });
        };
                              
                    
                    
        loadOverlay('crimes_lat_long');
        
                   /*
        $('input.range').change(function() {
            var value = $(this).val();
            coverageLayer.setRadius(value);
        }); */
                                   
});
    