
// FIRST Set up initial map center and zoom level
// relatively central coordinates for NYC: 40.70748615030739, -73.92744598608154
// zoom levels get closer the higher the number - try 11 or 12 or 13 to start

//me
// Prospect Park 40.662857, -73.969917
const map = L.map('map', {
    center: [40.662857, -73.969917],
    zoom: 11
})

//class
/*
const map = L.map('map', {
    center: [40.70748615030739, -73.92744598608154],
    zoom: 12
})
*/

/*
Later in process: Add a legend (checkboxes) to the upper-right corner.
At first, baselayers and overlays are set to `null` (empty legend).
We will be adding items to the legend as we load each layer.
*/  
//me
let controlLayers;
  
  controlLayers = L.control.layers( null, null, null, null, {
    position: "topright",
    collapsed: false,
  }).addTo(map);


    
// display basemap tiles 
//me
const basemapStreets = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 19, 
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//class
// const basemapStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//	maxZoom: 19,
//	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map); 
//


/*
/* const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);
 */

// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/

// read data from data files

//me
function createCircleMarker( feature, latlng ){
    // Change the values of these options to change the symbol's appearance
    let options = {
      radius: 6,
      fillColor: "blue",
      color: "red",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.2
    }
    return L.circleMarker( latlng, options );
}

const Q1Graffiti = $.getJSON("../data/GrafQ1.geojson", function(data){
    let overlay1 = L.geoJson(data, {
        pointToLayer: createCircleMarker, 
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Reported " + feature.properties.CREATED_DATE + "<br>" + "Status: "+feature.properties.STATUS);
          }
      }).addTo(map);
     // overlay1
    controlLayers.addOverlay(overlay1, "Jan - March 2021");
  });
console.log(Q1Graffiti);
  const Q2Graffiti = $.getJSON("../data/GrafQ2.geojson", function(data){
    let overlay2 = L.geoJson(data, {
        pointToLayer: createCircleMarker, 
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Reported " + feature.properties.CREATED_DATE + "<br>" + "Status: "+feature.properties.STATUS);
          } 
      }).addTo(map);
   // overlay2.addTo(map);
    controlLayers.addOverlay(overlay2, "April - June 2021");
  });

  const Q3Graffiti = $.getJSON("../data/GrafQ3.geojson", function(data){
    let overlay3 = L.geoJson(data, {
        pointToLayer: createCircleMarker, 
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Reported " + feature.properties.CREATED_DATE + "<br>" + "Status: "+feature.properties.STATUS);
          } 
      }).addTo(map);
  //  overlay3.addTo(map);
    controlLayers.addOverlay(overlay3, "July - September 2021");
  });

  const Q4Graffiti = $.getJSON("../data/GrafQ4.geojson", function(data){
    let overlay4 = L.geoJson(data, {
        pointToLayer: createCircleMarker, 
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Reported " + feature.properties.CREATED_DATE + "<br>" + "Status: "+feature.properties.STATUS);
          } 
      }).addTo(map);
  //  overlay4.addTo(map);
    controlLayers.addOverlay(overlay4, "October - December 2021");
  });

//class
/*
const waterAvg2020 = $.getJSON("..data/2020s-Mean-Monthly-High-Water.geojson",
function(data){
L.geoJson(data)
.addTO(map)
});

const waterAvg2050 = $.getJSON("..data/2050s-Mean-Monthly-High-Water.geojson",
function(data){
    L.geoJson(data)
    .addTO(map)
    });

const waterAvg2080 = $.getJSON("..data/2080s-Mean-Monthly-High-Water.geojson",
function(data){
    L.geoJson(data)
    .addTO(map)
    });
 

    const myCircle01 = L.circle([40.67305428283485, -73.997988949238],
    {
        color:'magenta',
        fillColor: 'yellow',
        radius: 500
    }).addTo(map);

    myCircle01.bindPopup("Area of Interest - Gowanus");

    */
//let accessPlans =


// add data overlay layers
