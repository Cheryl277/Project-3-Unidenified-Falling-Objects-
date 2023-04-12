let militaryBases = "Resources/military-bases.json"
let UFOData = "Resources/ufo_data.json"

//import multiple json files
//datapromise.all.then(function(data) {

Promise.all([d3.json(militaryBases), d3.json(UFOData)]).then(function(data) {
//array of the military base coordinates
var baseCoords = []; 
var baseNames = [];

for (let i = 0; i < data[0].length; i++) {
    //bases["location"] = dataCoords[i];
    //bases.push(dataCoords[i])
    baseCoords.push(Object.values(data[0][i]["geo_point_2d"]).reverse());
    baseNames.push(data[0][i]["site_name"]);
};

console.log(baseCoords);
console.log(data[1][0].ufo_latitude);
console.log(data[1]);
var UFOCoords = [];
var UFOCity = [];

for (let j = 0; j < data[1].length; j++) {
    //UFOCoords.push(Object.values(data[1][j]["ufo_latitude"]), Object.values(data[1][j]["ufo_longitude"]));
    UFOCoords.push(data[1][j].ufo_latitude);
    UFOCity.push(data[1][j]["city"]);
};

console.log(UFOCoords); 

var basesMarkers = [];
for (var i = 0; i < baseCoords.length; i++) {
    // loop through the basesCoords and baseNames array, create a new marker, and push it to the baseMarkers array
    basesMarkers.push(
      L.marker(baseCoords[i]).bindPopup("<h1>" + baseNames[i] + "</h1>")
    );
  }
  
  console.log(basesMarkers);
  // Add all the baseMarkers to a new layer group.
  // Now, we can handle them as one group instead of referencing each one individually.
  var baseLayer = L.layerGroup(basesMarkers);
  
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
    Bases: baseLayer
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
