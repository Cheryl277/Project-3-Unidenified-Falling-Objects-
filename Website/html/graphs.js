function init() {
    // Get the JSON data and console log it
    d3.json("http://127.0.0.1:5000/bar_graph").then(function (data) {
        //d3.json('../Resources/ufo_to_bases.json').then(function (data) {
        let ufo_bases_data = data;
        console.log(ufo_bases_data);
    });

    d3.json('../Resources/sightings_by_year.json').then(function (data) {
        //d3.json("http://localhost:8001/yourflaskroute").then(function (data) {
        let sightings_data = data;
        console.log(Object.values(sightings_data).map(o => { return o.year }));
        console.log(Object.values(sightings_data).map(o => { return o.ufo_sightings }));
    });

    //bar graph
    //d3.json('../Resources/ufo_to_bases.json').then(function (data) {
    //     var trace = {
    //         x: data.distance,
    //         y: data.total_count,
    //         type: 'bar',
    //     };

    //     var histogram_data = [trace];

    //     let layout = {
    //         title: "Distance from UFO Sighting to Closest Military Base (miles)",
    //         xaxis: { title: "Distance to Closest Military Base (miles)" },
    //         yaxis: { title: "Count" },
    //     };

    //     let config = { responsive: true }

    //     Plotly.newPlot("histogram", histogram_data, layout, config);

    // });

    d3.json("http://127.0.0.1:5000/bar_graph").then(function (data) {
        console.log("Raw data:", data);

        var trace = {
            x: data.map(o => o.distance),
            y: data.map(o => o.total_count),
            type: 'bar',
        };

        console.log("Trace:", trace);

        var histogram_data = [trace];

        let layout = {
            title: "Distance from UFO Sighting to Closest Military Base (miles)",
            xaxis: { title: "Distance to Closest Military Base (miles)", range: [0,200]},
            yaxis: { title: "Count" }
        };

        console.log("Layout:", layout);

        let config = { responsive: true }

        console.log("Config:", config);

        Plotly.newPlot("histogram", histogram_data, layout, config);

    }).catch(function (error) {
        console.error("Error fetching data:", error);
    });

    //line graph
    d3.json('../Resources/sightings_by_year.json').then(function (data) {

        var trace1 = {
            x: Object.values(data).map(o => { return o.year }),
            y: Object.values(data).map(o => { return o.ufo_sightings }),
            mode: 'lines+markers',
            name: 'UFO Sightings',
            marker: {
                color: 'red',
                size: 3
            },
            line: {
                color: 'red',
                width: 1
            }
        };

        var trace2 = {
            x: Object.values(data).map(o => { return o.year }),
            y: Object.values(data).map(o => { return o.fireball_sightings }),
            mode: 'lines+markers',
            name: 'Fireball Sightings',
            marker: {
                color: 'blue',
                size: 3
            },
            line: {
                color: 'blue',
                width: 1
            }
        };

        var trace3 = {
            x: Object.values(data).map(o => { return o.year }),
            y: Object.values(data).map(o => { return o.meteorite_sightings }),
            mode: 'lines+markers',
            name: 'Meteorite Sightings',
            marker: {
                color: 'green',
                size: 3
            },
            line: {
                color: 'green',
                width: 1
            }
        };

        var line_data = [trace1, trace3];

        var layout = {
            title: 'Sightings by Year (1900 - 2023)',
            xaxis: { title: 'Year' },
            yaxis: { title: 'Number of Sightings' }
        };

        Plotly.newPlot("line", line_data, layout);

    });

}

init();