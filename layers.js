let militaryBases = "Resources/military-bases.json"

let datapromise  = d3.json(militaryBases);

datapromise.then(function(data) {
    //console.log(data[0]["geo_shape"]["geometry"]["coordinates"][0])
    let dataCoords  = data[0]["geo_shape"]["geometry"]["coordinates"][0]

//array of the military base coordinates
//need to insert data
var bases = []; 
for (let i = 0; i < dataCoords.length; i++) {
    bases.push(dataCoords[i])
};
console.log(bases)

var basesMarkers = [];
for (var i = 0; i < basesMarkers.length; i++) {
    // loop through the bases array, create a new marker, and push it to the baseMarkers array
    basesMarkers.push(
      L.marker(bases[i]).bindPopup("<h1>" + i + "</h1>")
    );
  }
  
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
    center: [46.2276, 2.2137],
    zoom: 6,
    layers: [street, baseLayer]
  });
  
  // Pass our map layers into our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});