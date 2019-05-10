
mapboxgl.accessToken = 'pk.eyJ1IjoiYXIyODQ5IiwiYSI6ImNqdWRianV3aDB4ZTI0ZG8xZHU2NjduOHIifQ.eChcz-p6ZWsT3DmaeNP6rQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-105.600586,39.300299],
  zoom: 11
});

map.addControl(new mapboxgl.NavigationControl());

//getjson,
map.on('load', function() {

    $.getJSON('data/lsda2.geojson', function(data) {
      data.features.map(function(feature) {
        feature.properties.pop2010 = parseInt(feature.properties.pop2010);
      });

      data.features.forEach(function(feature) {
        console.log(feature.properties.pop2010)
      })


      map.addSource('community-district-population', {
          'type': 'geojson',
          'data': data,
      });

//colors the map with the percentages of HIV infection per state
      //map.addLayer({
        id: 'nyc-community-districts',
        type: 'fill',
        source: 'community-district-population',
        paint: {
          'fill-opacity': 0.7,
          'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'pop2010'],
              0, '#f1eef6',
              50000, '#bdc9e1',
              100000, '#74a9cf',
              250000, '#2b8cbe',
              500000, '#2b8cbe'
          ],
        }
      });
