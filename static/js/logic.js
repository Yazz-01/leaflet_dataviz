//Deine earthquakes and tectonic plates geoJson urls
var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"


//Create two layerData
var earthquakes = L.layerData();
var tectonicPlates = L.layerData();

//Define tile layers // Create map
var satelliteMap = L.tileLayer(("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 15
            id: "mapbox.satellite"
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

        d3.json(link).then(function(data) {
            L.geoJson(data).addTo(myMap);
        });