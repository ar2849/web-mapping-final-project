mapboxgl.accessToken = 'pk.eyJ1IjoiYXIyODQ5IiwiYSI6ImNqdWRianV3aDB4ZTI0ZG8xZHU2NjduOHIifQ.eChcz-p6ZWsT3DmaeNP6rQ';

var map = new mapboxgl.Map({
  container: 'mapcontainer',
  style: 'mapbox://styles/mapbox/dark-v9',
  scrollWheelZoom: false,
  center: [-105.600586, 39.300299],
  zoom: 2
});

map.addControl(new mapboxgl.NavigationControl());
// all the map making and parsing
map.on('style.load', function() {
  map.addSource('webmap', {
    type: 'geojson',
    data: './data/webmap.geojson',
  });
  $.getJSON('data/webmap.geojson'),
    function(data) {
      data.features.map(function(feature) {
        feature.properties.p_name = parseInt(feature.properties.p_name);
        feature.properties.p_diagnoses = parseInt(feature.properties.p_diagnoses);
        feature.properties.p_population = parseInt(feature.properties.p_population);
        feature.properties.p_sexed = parseInt(feature.properties.p_sexed);
        feature.properties.p_hived = parseInt(feature.properties.p_hived);
        feature.properties.p_inform6 = parseInt(feature.properties.p_inform6);
        feature.properties.p_inform9 = parseInt(feature.properties.p_inform9);
        feature.properties.p_hiv6 = parseInt(feature.properties.p_hiv6);
        feature.properties.p_hiv9 = parseInt(feature.properties.p_hiv9);
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
        20, '#de2d26',
        25, '#cb181d',
      ],
    }
  });
  // add in a border layer
  map.addLayer({
    id: 'highlight',
    type: 'line',
    source: 'webmap',
    paint: {
      'line-width': 1,
      'line-opacity': 0.7,
      'line-color': 'white',
    }
  });

  map.on('mousemove', function(e) {
    // query for the features under the mouse, but only in the lots layer
    var features = map.queryRenderedFeatures(e.point, {
      source: ['webmap'],
    });

    // get the first feature from the array of returned features.
    var webmap = features[0]

    if (webmap) { // if over the source population the statistics beneath the map with parsed data from this
      map.getCanvas().style.cursor = 'pointer'; // make the cursor a pointer
      $('#name').text(webmap.properties.p_name);
      $('#pop').text(webmap.properties.p_population);
      $('#diagnoses').text(webmap.properties.p_diagnoses);
      $('#sexed').text(webmap.properties.p_sexed);
      $('#hived').text(webmap.properties.p_hived);
      $('#inform6').text(webmap.properties.p_inform6);
      $('#inform9').text(webmap.properties.p_inform9);
      $('#hiv6').text(webmap.properties.p_hiv6);
      $('#hiv9').text(webmap.properties.p_hiv9);

    }
  })
});
