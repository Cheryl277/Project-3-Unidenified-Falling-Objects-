var myMap = L.map("heat_map", {
    center: [39.0997, -94.5786],
    zoom: 13
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var UFOData = "../Resources/ufo_data_clean.json";

Promise.all([d3.json(UFOData)]).then(function (data) {
    //assign variables to each file
    var UFOJSON = data[0];

    var UFOLat = [];
    var UFOLon = [];
    var UFOCity = [];

    for (let j = 0; j < 67052; j++) {
        UFOLat.push(UFOJSON[j].ufo_latitude);
        UFOLon.push(UFOJSON[j].ufo_longitude);
        UFOCity.push(UFOJSON[j].city);
    };

    var c = UFOLat.map(function (e, i) {
        return [e, UFOLon[i]];
    });
    console.log(c)

    var heatArray = [];

    for (var i = 0; i < response.length; i++) {
        var location = response[i].location;

        if (location) {
            heatArray.push([location.coordinates[1], location.coordinates[0]]);
        }
    }

    var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);

});
