
mapboxgl.accessToken = 'pk.eyJ1IjoiYXIyODQ5IiwiYSI6ImNqdWRianV3aDB4ZTI0ZG8xZHU2NjduOHIifQ.eChcz-p6ZWsT3DmaeNP6rQ';

var map = new mapboxgl.Map({
  container: 'mapcontainer',
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-105.600586,39.300299],
  zoom: 2
});

map.addControl(new mapboxgl.NavigationControl());

map.on('style.load', function() {
  map.addSource('webmap', {
  type: 'geojson',
  data: './data/webmap.geojson',
  });
  $.getJSON('data/webmap.geojson'),
  function(data) {
  data.features.map(function(feature) {
  feature.properties.p_diagnoses = parseInt(feature.properties.p_diagnoses);
  });
 };
//colors the map with the percentages of HIV infection per state
  map.addLayer({
  id: 'p_diagnoses',
  type: 'fill',
  source: 'webmap',
  paint: {
  'fill-opacity': 0.7,
  'fill-color': [
 'interpolate',
  ['linear'],
  ['get', 'p_diagnoses'],
  5, '#fee5d9',
  10, '#fcae91',
  15, '#fb6a4a',
  20, '#cb181d',
  ],
 }
 });
});
