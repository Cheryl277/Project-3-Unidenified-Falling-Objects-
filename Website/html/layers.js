// set dataset files to variables
let militaryBases = "/../Resources/military-bases.json"
let UFOData = "/../Resources/ufo_data_clean.json"
let meteoriteLandings = "/../Resources/Meteorite_Landings.geojson"
let fireballReports = "/../Fireball.geojson"

//read in all JSON data files
Promise.all([d3.json(militaryBases), d3.json(UFOData), d3.json(meteoriteLandings), d3.json(fireballReports)]).then(function(data) {
    //assign variables to each file
    var basesJSON = data[0];
    var UFOJSON = data[1];
    var meteoriteJSON = data[2].features;
    var fireballJSON = data[3];

    //array of the military base coordinates
var baseCoords = []; 
var baseNames = [];

//pushes coordinates and city names to arrays
for (let i = 0; i < data[0].length; i++) {
    baseCoords.push(Object.values(basesJSON[i]["geo_point_2d"]).reverse());
    baseNames.push(basesJSON[i]["site_name"]);
};

var UFOLat = [];
var UFOLon = [];
var UFOCity = [];

for (let j = 0; j < 67052; j++) {
    UFOLat.push(UFOJSON[j].ufo_latitude);
    UFOLon.push(UFOJSON[j].ufo_longitude);
    UFOCity.push(UFOJSON[j].city);
};

var c = UFOLat.map(function(e, i) {
  return [e, UFOLon[i]];
});
console.log(c)

var meteorCoords = [];

for (i = 0; i < meteoriteJSON.length; i++){
  meteorCoords.push(meteoriteJSON[i].geometry.coordinates.reverse())
}

/*
console.log(fireballJSON["Latitude (Deg)"]);
var fireballLat = [];
for (i = 0; i < fireballJSON["Latitude (Deg)"].length; i++){
  let latDec = 
}
*/

var baseIcon = L.icon({
  iconUrl : "Layers/base-clipart.png",
  iconSize : [35,35]
})
//creating the markers for each military bases
var basesMarkers = [];
for (var i = 0; i < baseCoords.length; i++) {
    // loop through the basesCoords and baseNames array, create a new marker, and push it to the baseMarkers array
    basesMarkers.push(
      L.marker(baseCoords[i], {icon : baseIcon}).bindPopup("<h1>" + baseNames[i] + "</h1>")
    );
  }

  //creating an icon for UFO markers
  var ufoIcon = L.icon({
    iconUrl : "Layers/ufo-clipart.png",
    iconSize : [35,35]
  })
  //creating ufo markers
  var ufoMarkers = [];
  for (i = 0; i <200; i++) {
  ufoMarkers.push(
    L.marker(c[i], {icon : ufoIcon}).bindPopup("<h2>" + UFOCity[i] + " Sighting")
  )}

  //creating an icon for meteor sightings
  var meteorIcon = L.icon({
    iconUrl : "Layers/asteroid-clipart-md.png",
    iconSize : [35,35]
  })
//creating meteor sighting markers
  var meteorMarker = [];
  for (i = 0; i < meteorCoords.length; i++){
    meteorMarker.push(
      L.marker(meteorCoords[i], {icon : meteorIcon}).bindPopup("<h3>" + meteoriteJSON[i].properties.name + " meteor sighting")
    )
  }

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