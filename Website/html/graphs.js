function init() {

    //histogram graph
    d3.json('../Resources/ufo_to_bases.json').then(function (data) {
        let distance_values = data.distance;

        var trace = {
            x: distance_values,
            type: 'histogram',
            autobinx: true,
        };

        var histogram_data = [trace];

        let layout = {
            margin: {
                t: 55,
                r: 25,
                l: 65,
                b: 25
            },
            title: "Distance from UFO Sighting to Closest Military Base (miles)",
            xaxis: { title: "Distance to Closest Military Base (miles)" },
            yaxis: { title: "Count" }
        };

        let config = { responsive: true }

        Plotly.newPlot("histogram", histogram_data, layout, config);

    });

//line graph
    d3.json('../Resources/sightings_by_year.json').then(function (data) {

        var trace1 = {
            x: data.year,
            y: data.ufo_sightings,
            mode: 'lines+markers',
            name: 'UFO Sightings',
            marker: {
                color: 'red',
                size: 8
            },
            line: {
                color: 'red',
                width: 1
            }
        };

        var trace2 = {
            x: data.year,
            y: data.fireball_sightings,
            mode: 'lines+markers',
            name: 'Fireball Sightings',
            marker: {
                color: 'blue',
                size: 8
            },
            line: {
                color: 'blue',
                width: 1
            }
        };

        var trace3 = {
            x: data.year,
            y: data.meteorite_sightings,
            mode: 'lines+markers',
            name: 'Meteorite Sightings',
            marker: {
                color: 'green',
                size: 8
            },
            line: {
                color: 'green',
                width: 1
            }
        };

        var line_data = [trace1, trace2, trace3];

        var layout = {
            title: 'Sightings by Year (1910 - 2023)',
            xaxis: {title: 'Year'},
            yaxis: {title: 'Number of Sightings'}
        };

        Plotly.newPlot("line", line_data, layout);

    });

}

init();