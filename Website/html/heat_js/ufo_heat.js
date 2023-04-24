var myMap = L.map("heat_map", {
    center: [39.0997, -94.5786],
    //layers: [street, ufo],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// })

// var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });

// var baseMaps = {
//     Street: street,
//     Topography: topo
// };

// var overlayMaps = {
//     ufo: heat,
//     pop_heat: population
// };

// L.control.layers(baseMaps, overlayMaps).addTo(myMap);

var UFOData = "../../Resources/ufo_data_clean.json";
var PopulationData = "../../Resources/population_density.json";

Promise.all([d3.json(UFOData), d3.json(PopulationData)]).then(function (data) {
    //assign variables to each file
    var UFOJSON = data[0];
    var PopulationJSON = data[1];

    console.log(Object.values(PopulationJSON).map(o => { return o.lat }));
    console.log(Object.values(PopulationJSON).map(o => { return o.lng }));

    var UFOLat = [];
    var UFOLon = [];

    for (let j = 0; j < 67052; j++) {
        UFOLat.push(UFOJSON[j].ufo_latitude);
        UFOLon.push(UFOJSON[j].ufo_longitude);
    };

    var c = UFOLat.map(function (e, i) {
        return [e, UFOLon[i]];
    });
    console.log(c)

    var heatArray = [];

    for (var i = 0; i < c.length; i++) {

        heatArray.push([c[i][0], c[i][1]]);
    }

    var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);

    var PopLat = [];
    var PopLon = [];

    PopLat = Object.values(PopulationJSON).map(o => { return o.lat });
    PopLon = Object.values(PopulationJSON).map(o => { return o.lng });

    var pop_heatArray = [];

    for (var x = 0; x < PopLat.length; x++) {

        pop_heatArray.push([PopLat[x], PopLon[x]]);
    }

    console.log(pop_heatArray)

    // var pop_heat = L.heatLayer(pop_heatArray, {
    //     radius: 20,
    //     blur: 35,
    //     gradient: {
    //         0.2: "#ffffd4",
    //         0.4: "#fed98e",
    //         0.6: "#fe9929",
    //         0.8: "#d95f0e",
    //         1: "#993404"
    //     }
    // }).addTo(myMap);

});
