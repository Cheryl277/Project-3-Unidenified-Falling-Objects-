// set dataset files to variables
let militaryBases = "Resources/military-bases.json"
let UFOData = "Resources/ufo_data.json"
let meteoriteLandings = "Resources/Meteorite_Landings.geojson"

//const collect = require('collect.js');

//import multiple json files
//datapromise.all.then(function(data) {

Promise.all([d3.json(militaryBases), d3.json(UFOData), d3.json(meteoriteLandings)]).then(function(data) {
    //assign variables to each file
    var basesJSON = data[0];
    var UFOJSON = data[1];
    var meteoriteJSON = data[2].features;

    //array of the military base coordinates
var baseCoords = []; 
var baseNames = [];

//pushes coordinates and city names to arrays
for (let i = 0; i < data[0].length; i++) {
    baseCoords.push(Object.values(basesJSON[i]["geo_point_2d"]).reverse());
    baseNames.push(basesJSON[i]["site_name"]);
};

//returns the value of the desired key for meteoriteJSON

var UFOLat = [];
var UFOLon = [];
var UFOCity = [];

for (let j = 0; j < 67052; j++) {
    //UFOCoords.push(Object.values(data[1][j]["ufo_latitude"]), Object.values(data[1][j]["ufo_longitude"]));
    UFOLat.push(UFOJSON[j].ufo_latitude);
    UFOLon.push(UFOJSON[j].ufo_longitude);
    UFOCity.push(UFOJSON[j].city);
};
console.log(meteoriteJSON[0].geometry);
//for (let i = 0)

var c = UFOLat.map(function(e, i) {
  return [e, UFOLon[i]];
});
console.log(c)

var meteorCoords = [];

for (i = 0; i < meteoriteJSON.length; i++){
  meteorCoords.push(meteoriteJSON[i].geometry.coordinates)
}

var basesMarkers = [];
for (var i = 0; i < baseCoords.length; i++) {
    // loop through the basesCoords and baseNames array, create a new marker, and push it to the baseMarkers array
    basesMarkers.push(
      L.marker(baseCoords[i]).bindPopup("<h1>" + baseNames[i] + "</h1>")
    );
  }

  var ufoMarkers = [];
  for (i = 0; i <100; i++) {
  ufoMarkers.push(
    L.marker(c[i]).bindPopup("<h2>" + UFOCity[i] + " Sighting")
  )}

  var meteorMarker = [];
  for (i = 0; i < meteorCoords.length; i++){
    meteorMarker.push(
      L.marker(meteorCoords[i]).bindPopup("<h3>" + meteoriteJSON[i].properties.name + " meteor sighting")
    )
  }

  console.log(ufoMarkers);
  console.log(basesMarkers);
  // Add all the baseMarkers to a new layer group.
  // Now, we can handle them as one group instead of referencing each one individually.
  var baseLayer = L.layerGroup(basesMarkers);
  var ufoLayer = L.layerGroup(ufoMarkers);
  var meteorLayer = L.layerGroup(meteorMarker);
  
  // Define variables for our tile layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  // Only one base layer can be shown at a time.
  var baseMaps = {
    Street: street,
    Topography: topo
  };
  
  // Overlays that can be toggled on or off
  var overlayMaps = {
    Bases: baseLayer,
    UFOs: ufoLayer,
    Meteors : meteorLayer
  };
  
  // Create a map object, and set the default layers.
  var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5,
    layers: [street, baseLayer]
  });
  
  // Pass our map layers into our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});