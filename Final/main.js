
let MassOnly = false;
let MurderOnly = false;




//Central Park   center: [40.70748615030739, -73.92744598608154],
// Prospect Park 40.662857, -73.969917
const map = L.map('map', {
  center: [40.662857, -73.969917],
  zoom: 13
});

//CONTROL LAYERS

 let controlLayers;
controlLayers = L.control.layers( null, null, null, null, {
position: "topright",
collapsed: false,
}).addTo(map);
//CONTROL HIDDEN
$('.leaflet-control-layers').hide();
  
// BASE MAP

const basemapStreets = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
maxZoom: 19, 
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);


//MARKER STYLES
function createCircleMarker( feature, latlng ){
  
  let options = {
    radius: 3,
    fillColor: "blue",
    color: "white",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.2
  }
  return L.circleMarker( latlng, options );
}

function createCircleMarkerMass( feature, latlng ){

let options = {
  radius: 4,
  fillColor: "orange",
  color: "white",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.5
}
return L.circleMarker( latlng, options );
}



//OTHER SHOOTINGS
const Shooting = $.getJSON("Shooting.geojson", function(data){
let overlay1 = L.geoJson(data, {
    pointToLayer: createCircleMarker, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
      }
  }).addTo(map);
 // overlay1
controlLayers.addOverlay(overlay1, "All Shootings");
});



//MURD
const ShootingM = $.getJSON("ShootingM.geojson", function(data){
let overlay2 = L.geoJson(data, {
    pointToLayer: createCircleMarkerMass, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
      }
  }).addTo(map);
 // overlay2
controlLayers.addOverlay(overlay2, "Murder Shootings");
});

//MASS
const MassShooting = $.getJSON("ShootingMass.geojson", function(data){
  let overlay3 = L.geoJson(data, {
      pointToLayer: createCircleMarkerMass, 
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
        }
    }).addTo(map);
   // overlay3
  controlLayers.addOverlay(overlay3, "Mass Shootings");
  });
 
 // MASSM
const MassShootingM = $.getJSON("ShootingMassM.geojson", function(data){
  let overlay4 = L.geoJson(data, {
      pointToLayer: createCircleMarkerMass, 
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
        }
    }).addTo(map);
   // overlay4
  controlLayers.addOverlay(overlay4, "Mass Shootings w Murder");
  });

//TOGGLE LAYERS

function ToggleMass () {
  MassOnly = !MassOnly;
  alert(MassOnly);
controlLayers.removeLayer(Shooting);
 // alert(MassOnly);
//  alert(MurderOnly);
};


function ToggleMurder () {
  MurderOnly = !MurderOnly;
//  alert(MassOnly);
//  alert(MurderOnly);
};
