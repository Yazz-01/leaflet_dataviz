//Deine earthquakes and tectonic plates geoJson urls
var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"


//Create two layerGROUP
var earthquakes = L.LayerGroup();
var tectonicPlates = L.LayerGroup();

function deployMap() {
    //Define tile layers // Create map
    var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    // Adding a tile layer (the background map image) to our map
    // We use the addTo method to add objects to our map
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Satellite Map": satelliteMap
    };
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes,
        TectonicPlates: tectonicPlates
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5
    });
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}


//Data - Promise

d3.json(earthquakesURL).then(function(data) {
    // Determine the marker size by magnitude
    function markerSize(magnitude) {
        return magnitude * 4;
        //L.geoJson(data).addTo(myMap);
        //console.log(data)
    };
});

//Define the marker color by depht for the eartqueakes----LISTO
function chooseColor(depth) {
    switch (true) {
        case depth > 90:
            return "red";
        case depth > 70:
            return "orangered";
        case depth > 50:
            return "orange";
        case depth > 30:
            return "gold";
        case depth > 10:
            return "yellow";
        default:
            return "lightgreen";
    }
}

// Create a GeoJSON layer containing the features array
// Each feature a popup describing the place and time of the earthquake
L.geoJSON(earthquakeData, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng,
            // Set the style of the markers based on properties.mag
            {
                radius: markerSize(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.7,
                color: "black",
                stroke: true,
                weight: 0.5
            }
        );
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Location: " + feature.properties.place + "</h3><hr><p>Date: " +
            new Date(feature.properties.time) + "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
    }
}).addTo(earthquakes);
// Sending our earthquakes layer to the createMap function
earthquakes.addTo(myMap);

// Get the tectonic plate data from tectonicplatesURL
d3.json(tectonicplatesURL, function(data) {
    L.geoJSON(data, {
        color: "orange",
        weight: 2
    }).addTo(tectonicplates);
    tectonicplates.addTo(myMap);
});
// Add legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
        depth = [-10, 10, 30, 50, 70, 90];

    div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"

    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div
};
legend.addTo(myMap)
});
// Llamar fucntion  deployMap --- 
deployMap()
});


//Create a GeoJson layer containing the features array
// Each feature