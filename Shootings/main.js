
const myMap = L.map('map', {
  center: [40.662857, -73.969917],
  zoom: 11
});

let MassOnly = false;
let MurderOnly = false;
let DateOnly = false;


let testlayer;
let InitialLoadLayer;
let SOL;
let MOL;
let MSOL;
let MMOL;




// BASE MAP

const basemapStreets = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
maxZoom: 19, 
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);




  
   
    function MarkersFirstLoad () {
    $.getJSON("AllShoot.geojson", function(json) {

    InitialLoadLayer = L.geoJson(json, {
   
        pointToLayer: function(feature, latlng) {
         
          let ismurd = feature.properties.MurderF === "TRUE";
          
          if(   (!MurderOnly) 
             || (MurderOnly && ismurd)
              )
                  {
                     
                        if (ismurd) {
                        return L.circleMarker(latlng, {
                          radius: 2.5,
                          fillColor: "orange",
                          color: "yellow", 
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
        
                
  
      
        onEachFeature: function (feature, InitialLoadLayer) {
            InitialLoadLayer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
            
                              );
            InitialLoadLayer.on('mouseover', function (e) {
              this.openPopup();
          });
          InitialLoadLayer.on('mouseout', function (e) {
              this.closePopup();
          });
           
          },
      }
    
      ),

      
      sliderControl = L.control.sliderControl({
          position: "topleft",
          layer: InitialLoadLayer, 
          timeAttribute: "OCCUR_DATE",
        
         showAllOnStart: true,
         range: true,
         rezoom: false
      });

     
      myMap.addControl(sliderControl);
      
      sliderControl.startSlider();
      
  });

    };



       

//TOGGLE LAYERS

function ToggleMurder () {

  MurderOnly = !MurderOnly;

myMap.removeControl(sliderControl);
MarkersFirstLoad();

};

    MarkersFirstLoad();
