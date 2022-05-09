//Central Park   center: [40.70748615030739, -73.92744598608154],
// Prospect Park 40.662857, -73.969917
const myMap = L.map('map', {
  center: [40.662857, -73.969917],
  zoom: 11
});

let MassOnly = false;
let MurderOnly = false;

let SOL;
let MOL;
let MSOL;
let MMOL;



/* var MassButton = document.getElementById("MassButton");
var MassMarkers = {};
var Marker;

document.body.addEventListener('click', function (event) {
	var el = event.target,
  		tag = el.tagName;
      
	if (tag === "BUTTON" && el.id == "MassButton") {
  alert("massbuttonclicked");
    	event.preventDefault();
      
    var i = el.dataset.i,
        marker = MassMarkers[i];
       
  //  if (map.hasLayer(marker)) {
    	window.myMap.removeLayer(marker);
   // } else {
   // 	map.addLayer(marker);
      alert("massbuttonclicked");
   // }
  }
});
 */


//CONTROL LAYERS
/* let controlLayers;
controlLayers = L.control.layers( null, null, {
position: "topright",
collapsed: false,
}).addTo(myMap); */
//CONTROL HIDDEN
// $('.leaflet-control-layers').hide();



// BASE MAP

const basemapStreets = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
maxZoom: 19, 
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);


//MARKER STYLES
function createCircleMarker( feature, latlng ){
  
  let options = {
    radius: 1.5,
    fillColor: "blue",
    color: "white",
    weight: .3,
    opacity: 1,
    fillOpacity: 0.2
  }
  return L.circleMarker( latlng, options );
}

function createCircleMarkerMass( feature, latlng ){

let options = {
  radius: 2.5,
  fillColor: "yellow",
  color: "white",
  weight: .3,
  opacity: 1,
  fillOpacity: 0.5
}
return L.circleMarker( latlng, options );
}

function createCircleMarkerMurder( feature, latlng ){

  let options = {
    radius: 2.5,
    fillColor: "orange",
    color: "deeppink",
    weight: .3,
    opacity: 1,
    fillOpacity: 0.5
  }
  return L.circleMarker( latlng, options );
  }

  function createCircleMarkerMM( feature, latlng ){

    let options = {
      radius: 2.5,
      fillColor: "orangered",
      color: "deeppink",
      weight: .3,
      opacity: 1,
      fillOpacity: 0.5
    }
    return L.circleMarker( latlng, options );
    }



//OTHER SHOOTINGS
const Shooting = $.getJSON("Shooting.geojson", function(data){
 SOL = L.geoJson(data, {
    pointToLayer: createCircleMarker, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
      }
  }).addTo(myMap);
 // overlay1
//controlLayers.addOverlay(SOL, "All Shootings");
});



//MURD
const ShootingM = $.getJSON("ShootingM.geojson", function(data){
 MOL = L.geoJson(data, {
    pointToLayer: createCircleMarkerMurder, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
      }
  }).addTo(myMap);
 // overlay2
//controlLayers.addOverlay(MOL, "Murder Shootings");
});

//MASS
const MassShooting = $.getJSON("ShootingMass.geojson", function(data){
   MSOL = L.geoJson(data, {
      pointToLayer: createCircleMarkerMass, 
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
        }
    }).addTo(myMap);
   // overlay3
 // controlLayers.addOverlay(MSOL, "Mass Shootings");
  });
 
 // MASSM
const MassShootingM = $.getJSON("ShootingMassM.geojson", function(data){
   MMOL = L.geoJson(data, {
      pointToLayer: createCircleMarkerMM, 
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
        }
    }).addTo(myMap);
   // overlay4
  //controlLayers.addOverlay(MMOL, "Mass Shootings w Murder");
  });

//TOGGLE LAYERS
/* 
function ToggleMass () {
  MassOnly = !MassOnly;
 // alert(MassOnly);
  if(MassOnly && MurderOnly) {
    myMap.removeLayer(SOL);
    myMap.removeLayer(MOL);
    myMap.removeLayer(MSOL);
    if(!MurderOnly) {
      myMap.removeLayer(MOL);
    };
  }
else if(MurderOnly) {
  myMap.addLayer(MOL);}
  else {
    myMap.addLayer(MOL);
    myMap.addLayer(SOL)
  };
}; */
 // alert(MassOnly);
//  alert(MurderOnly);

function ToggleMurder () {
  MurderOnly = !MurderOnly;
  ToggleLayer();
};

function ToggleMass () {
  MassOnly = !MassOnly;
  ToggleLayer();
};

function ToggleLayer () {
//  MurderOnly = !MurderOnly;
  if(MurderOnly && MassOnly)  {
    myMap.removeLayer(SOL);
    myMap.removeLayer(MOL);
    myMap.removeLayer(MSOL);
    }
  else if (MurderOnly && !MassOnly) {
          myMap.addLayer(MOL);
          myMap.removeLayer(SOL);
          myMap.removeLayer(MSOL);
          }
  else if(!MurderOnly && MassOnly) {
          myMap.addLayer(MSOL);
          myMap.removeLayer(SOL);
          myMap.removeLayer(MOL);
          }
    else {
    myMap.addLayer(SOL);
    myMap.addLayer(MOL);
    myMap.addLayer(MSOL);
    };
  };
//  alert(MassOnly);
//  alert(MurderOnly);
/* 
layerGroup = L.layerGroup([SOL,MMOL]);
var sliderControl = L.control.sliderControl({position: "topleft", layer:layerGroup});
map.addControl(sliderControl);
sliderControl.startSlider();
//sliderControl = L.control.sliderControl({position: "topright", layer: testlayer, range: true});
 */
let sliderControl = L.control.sliderControl({position: "topleft", layer: MMOL, range: true, 
    timeAttribute: "CREATED_DATE"});

/*     var sliderControl = L.control.sliderControl({
      layer: MMOL,
      follow: true,
      range: true
 });
 map.addControl(sliderControl);
 sliderControl.startSlider(); */