// Create map
var myMap = L.map("map". {
    center: [40.7128, -74.0059]
    zoom: 11
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

//Data - Promise
var link = "static/data/eartquak.geojson";

var mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.6,
    weight: 1.5
};

d3.json(link).then(function(data) {
    L.geoJson(data, {
        //Style Object

    }).addTo(myMap);
});