//Central Park   center: [40.70748615030739, -73.92744598608154],
// Prospect Park 40.662857, -73.969917
const myMap = L.map('map', {
  center: [40.662857, -73.969917],
  zoom: 11
});

let MassOnly = false;
let MurderOnly = false;
let DateOnly = false;

//let ismass = true;
//let ismurd = false;

let testlayer

let SOL;
let MOL;
let MSOL;
let MMOL;
//let sliderControl;


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
/* 
let controlLayers;
controlLayers = L.control.layers( null, null, {
position: "topright",
collapsed: false,
}).addTo(myMap);
//CONTROL HIDDEN
// $('.leaflet-control-layers').hide();

*/

// BASE MAP

const basemapStreets = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
maxZoom: 19, 
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);


//MARKER STYLES
function createCircleMarker( feature, latlng ){
  
  let options = {
    radius: 2,
    fillColor: "blue",
    color: "white",
    weight: .3,
    opacity: 1,
    fillOpacity: 0.3
  }
  return L.circleMarker( latlng, options );
}

function createCircleMarkerMass( feature, latlng ){

let options = {
  radius: 2.5,
  fillColor: "blue",
  color: "white",
  weight: .3,
  opacity: 1,
  fillOpacity: 0.4
}
return L.circleMarker( latlng, options );
}

function createCircleMarkerMurder( feature, latlng ){

  let options = {
    radius: 2,
    fillColor: "orange",
    color: "white", //"yellow",
    weight: .3,
    opacity: 1,
    fillOpacity: 0.3
  }
  return L.circleMarker( latlng, options );
  }

  function createCircleMarkerMM( feature, latlng ){

    let options = {
      radius: 2.5,
      fillColor: "orange",
      color:  "white", //"yellow", //"deeppink",
      weight: .3,
      opacity: 1,
      fillOpacity: 0.4
    }
    return L.circleMarker( latlng, options );
    }
 


//OTHER SHOOTINGS
const Shooting = $.getJSON("Shooting.geojson", function(data){
 SOL = L.geoJson(data, {
    pointToLayer: createCircleMarker, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                      + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
        layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
      }
  }).addTo(myMap);
 // overlay1
//controlLayers.addOverlay(SOL, "All Shootings");
});

//MASS
const MassShooting = $.getJSON("ShootingMass.geojson", function(data){
  MSOL = L.geoJson(data, {
     pointToLayer: createCircleMarkerMass, 
     onEachFeature: function (feature, layer) {
         layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                      + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
         layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
        }
   }).addTo(myMap);
  // overlay3
 //controlLayers.addOverlay(MSOL, "Mass Shootings");
 });

//MURD
const ShootingM = $.getJSON("ShootingM.geojson", function(data){
 MOL = L.geoJson(data, {
    pointToLayer: createCircleMarkerMurder, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                      + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
        layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
      }
  }).addTo(myMap);
 // overlay2
//controlLayers.addOverlay(MOL, "Murder Shootings");
});

 // MASSM
const MassShootingM = $.getJSON("ShootingMassM.geojson", function(data){
   MMOL = L.geoJson(data, {
      pointToLayer: createCircleMarkerMM, 
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                        + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
          layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
        }
    }).addTo(myMap);
   // overlay4
  //controlLayers.addOverlay(MMOL, "Mass Shootings w Murder");
  });
 
//TOGGLE LAYERS

function ToggleMurder () {
  MurderOnly = !MurderOnly;
  if(DateOnly) {document.getElementById('DateButton').click()};
  myMap.removeLayer(testlayer);
  ToggleLayer();
};

function ToggleMass () {
  MassOnly = !MassOnly;
  if(DateOnly) {document.getElementById('DateButton').click()};
  myMap.removeLayer(testlayer);
  ToggleLayer();
};

function ToggleDate () {
  //placed at end because the "if" runs before the toggle is made
  //DateOnly = !DateOnly
  if(!DateOnly) { 
  if(MassOnly){document.getElementById('MassButton').click()};
  if(MurderOnly){document.getElementById('MurderButton').click()};
  //  MassOnly = false;
  //  MurderOnly = false;
  //  $(".slider").prop("checked", false);
   // $(".slider murder").prop("checked", false);
    myMap.removeLayer(SOL);
    myMap.removeLayer(MSOL);
    myMap.removeLayer(MOL);
    myMap.removeLayer(MMOL)}
    else {
      myMap.addLayer(SOL);
      myMap.addLayer(MSOL);
      myMap.addLayer(MOL);
      myMap.addLayer(MMOL)}
  DateOnly = !DateOnly
  };

  function ToggleLayer () {
    //preserve layer order, remove first
    myMap.removeLayer(SOL);
    myMap.removeLayer(MSOL);
    myMap.removeLayer(MOL);
    myMap.removeLayer(MMOL);
    //  then add
       if(MurderOnly && MassOnly)  {
        myMap.addLayer(MMOL);
        }
      else if (MurderOnly && !MassOnly) {
              myMap.addLayer(MOL);
              myMap.addLayer(MMOL);
              //myMap.removeLayer(SOL);
              //myMap.removeLayer(MSOL);
              }
      else if(!MurderOnly && MassOnly) {
              myMap.addLayer(MSOL);
              myMap.addLayer(MMOL);
              //myMap.removeLayer(SOL);
              //myMap.removeLayer(MOL);
              }
        else {
        myMap.addLayer(SOL);
        myMap.addLayer(MSOL);
        myMap.addLayer(MOL);
        myMap.addLayer(MMOL);
        };
      };
    




/* 
  $(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: new Date('2010.01.01').getTime() / 1000,
      max: new Date('2014.01.01').getTime() / 1000,
      step: 86400,
      values: [ new Date('2013.01.01').getTime() / 1000, new Date('2013.02.01').getTime() / 1000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( (new Date(ui.values[ 0 ] *1000).toDateString() ) + " - " + (new Date(ui.values[ 1 ] *1000)).toDateString() );
      }
    });
    $( "#amount" ).val( (new Date($( "#slider-range" ).slider( "values", 0 )*1000).toDateString()) +
      " - " + (new Date($( "#slider-range" ).slider( "values", 1 )*1000)).toDateString());
  });
   */

  
    //Fetch some data from a GeoJSON file
    $.getJSON("AllShoot.geojson", function(json) {
  //  d3.json("AllShoot.geojson", function(json) { 
    testlayer = L.geoJson(json, {
       // pointToLayer: createCircleMarker, 
      
        pointToLayer: function(feature, latlng) {
          let ismass = feature.properties.Mass === "TRUE";
          let ismurd = feature.properties.MurderF === "TRUE";
          if(   (!MurderOnly && !MassOnly) 
              || (!MurderOnly && (MassOnly === ismass ))
              || (!MassOnly && (MurderOnly === ismurd)) 
              || (MurderOnly && ismurd && MassOnly && ismass)
              )
                  {
                      //if (feature.properties.Mass === "TRUE" && feature.properties.MurderF === "TRUE") {
                        if (ismass && ismurd) {
                        return L.circleMarker(latlng, {
                          radius: 2.5,
                          fillColor: "orange",
                          color: "yellow", //"deeppink",
                          weight: .3,
                          opacity: 1,
                          fillOpacity: 0.3
                        })
                        } 
                        else if (!ismass && ismurd) {
                          return L.circleMarker(latlng, {
                            radius: 2,
                            fillColor: "orange",
                            color: "yellow", //"deeppink",
                            weight: .3,
                            opacity: 1,
                            fillOpacity: 0.2
                          })
                          } 
                          else if (ismass && !ismurd) {
                            return L.circleMarker(latlng, {
                              radius: 2.5,
                              fillColor: "blue",
                              color: "white",
                              weight: .3,
                              opacity: 1,
                              fillOpacity: 0.3
                            })
                            } 
                            else {
                              return L.circleMarker(latlng, {
                                radius: 2,
                                fillColor: "blue",
                                color: "white",
                                weight: .3,
                                opacity: 1,
                                fillOpacity: 0.2
                              })
                              } 
                }
                },
        
                
  
      
        onEachFeature: function (feature, testlayer) {
            testlayer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                              + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
            testlayer.on('mouseover', function (e) {
              this.openPopup();
          });
          testlayer.on('mouseout', function (e) {
              this.closePopup();
          });
            //if("a"=="a") {options.fillColor = "white"};
          },
      }
    
      ),
      /*     sliderControl = L.control.sliderControl({
              position: "topleft",
              layer: testlayer
          });
 */
      //For a Range-Slider use the range property:
      sliderControl = L.control.sliderControl({
          position: "topleft",
          layer: testlayer, 
          timeAttribute: "OCCUR_DATE",
         // isEpoch: true,
          range: true
      });

      //Make sure to add the slider to the map ;-)
      myMap.addControl(sliderControl);
      //And initialize the slider
      sliderControl.startSlider();
      
  });


  
