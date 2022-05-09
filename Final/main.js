//Central Park   center: [40.70748615030739, -73.92744598608154],
// Prospect Park 40.662857, -73.969917
const myMap = L.map('map', {
  center: [40.662857, -73.969917],
  zoom: 13
});

let MassOnly = false;
let MurderOnly = false;

let overlay1;
let overlay2;
let overlay3;
let overlay4;


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
let controlLayers;
controlLayers = L.control.layers( null, null, {
position: "topright",
collapsed: false,
}).addTo(myMap);
//CONTROL HIDDEN
 $('.leaflet-control-layers').hide();



// BASE MAP

const basemapStreets = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
maxZoom: 19, 
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);


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
 SOL = L.geoJson(data, {
    pointToLayer: createCircleMarker, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
      }
  }).addTo(myMap);
 // overlay1
controlLayers.addOverlay(SOL, "All Shootings");
});



//MURD
const ShootingM = $.getJSON("ShootingM.geojson", function(data){
 MOL = L.geoJson(data, {
    pointToLayer: createCircleMarkerMass, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
      }
  }).addTo(myMap);
 // overlay2
controlLayers.addOverlay(MOL, "Murder Shootings");
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
  controlLayers.addOverlay(MSOL, "Mass Shootings");
  });
 
 // MASSM
const MassShootingM = $.getJSON("ShootingMassM.geojson", function(data){
   MMOL = L.geoJson(data, {
      pointToLayer: createCircleMarkerMass, 
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" + "Victims: "+feature.properties.Victims);
        }
    }).addTo(myMap);
   // overlay4
  controlLayers.addOverlay(MMOL, "Mass Shootings w Murder");
  });

//TOGGLE LAYERS

function ToggleMass () {
  MassOnly = !MassOnly;
 // alert(MassOnly);
  if(MassOnly) {
myMap.removeLayer(SOL);
myMap.removeLayer(MOL);
}
else {
myMap.addLayer(MOL);
myMap.addLayer(SOL)};
 // alert(MassOnly);
//  alert(MurderOnly);
};


function ToggleMurder () {
  MurderOnly = !MurderOnly;
  if(MurderOnly) {
    myMap.removeLayer(SOL);
    myMap.removeLayer(MSOL);
  }
    else {
    myMap.addLayer(SOL);
    myMap.addLayer(MSOL);
  };
//  alert(MassOnly);
//  alert(MurderOnly);
};

/////
//TRYING SOMETHING NEW
/////
/* 
L.Control.GroupedLayers.include({
  addOverlays: function () {
      for (var i in this._layers) {
          if (this._layers[i].overlay) {
              if (!this._map.hasLayer(this._layers[i].layer)) {
                  this._map.addLayer(this._layers[i].layer);
              }
          }
      }
  },
  removeOverlays: function () {
      for (var i in this._layers) {
          if (this._layers[i].overlay) {
              if (this._map.hasLayer(this._layers[i].layer)) {
                  this._map.removeLayer(this._layers[i].layer);
              }
          }
      }
  }
});

var control = new L.Control.GroupedLayers(ExampleData.Basemaps, {
  'Landmarks': {
      'Cities': ExampleData.LayerGroups.cities,
      'Restaurants': ExampleData.LayerGroups.restaurants
  },
  'Random': {
      'Dogs': ExampleData.LayerGroups.dogs,
      'Cats': ExampleData.LayerGroups.cats
  }
}).addTo(map);

L.DomEvent.addListener(L.DomUtil.get('MassButton'), 'click', function () {
  control.addOverlays();
});

L.DomEvent.addListener(L.DomUtil.get('MurderButton'), 'click', function () {
  control.removeOverlays();
}); 
*/




/*
$(document).ready(function () {

  var newParent = document.getElementById('custom-map-controls');
          var oldParent = document.getElementsByClassName("leaflet-top leaflet-right")
  
          while (oldParent[0].childNodes.length > 0) {
              newParent.appendChild(oldParent[0].childNodes[0]);
          }
   });


   ////
   ////HTMLScript
   ////

   var myData =  L.layerGroup([]);
   myData.addLayer(ci_data);
   myData.addTo(map); 
   
   
 //If Radio Button one is clicked.  
 document.getElementById("radioOne").addEventListener('click', function(event) {
 theExpression = 'feature.properties.Verified !== "Y" ';
 console.log(theExpression);	
   
   myData.clearLayers();
   map.removeLayer(myData);
   
   ci_data = L.geoJson(null, {

     pointToLayer: function(feature, latlng) {

       return L.circleMarker(latlng, {
         color:'black',
         fillColor:  'red',
         fillOpacity: 1,
         radius: 8
       })
     },  
     onEachFeature: function (feature, layer) {
       layer.bindPopup(feature.properties.Verified);
     },
     filter: function(feature, layer) {   
        return (feature.properties.Verified !== "Y" );
     },

   });
   
   
   $.getJSON(url, function(data) {
        Shooting.addData(data);
   });

     myData.addLayer(Shooting);
     myData.addTo(map);;
   });
 
 */