var map;
var apiKey = "AIzaSyCsLRNstIbl5TVv1rpBitRWbk8tSH7gjmI";
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: -33.865427, lng: 151.196123},
        mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);

    map.data.setStyle(function(feature) {
        var magnitude = feature.getProperty('mag');
        return {
            icon: getCircle(magnitude)
        };
    });
}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5
    };
}

function eqfeed_callback(results) {
    map.data.addGeoJson(results);
}

/*
function right (){
	var cell=document.getElementsByClassName("pointer")[0];
  if(cell.getAttribute("id").charAt(1) != "3"){
  		cell.removeAttribute("class");
      cell.style.border="solid thin";
      cell = document.getElementById(Number(cell.getAttribute("id"))+1);
     	cell.style.border="solid";
      cell.setAttribute("class", "pointer");
      }
}
*/
/*WE WANT THE DIV TO HAVE THESE properties
    background-color: #85bee0;
    height: 20em;
    width: 15em;
    position: absolute;
    right: 2em;
    border-radius: 1em;
    background-color: #54a4a6;
    top: 3em;
*/

/*
  function displayMenu () {
      var cell = document.getElementById("menuWrap");
      var drop = document.createElement("div");
      drop.setAttribute("id", "dropdown");
      cell.appendChild(drop);

      var option = document.getElementById("dropdown");
      option.style.position = "absolute";
      option.style.width= "15em";
      option.style.height="20em";
      option.style.right="2em";
      option.style.top ="3em";
      option.setAttribute("style", "border-radius: 1em");
      option.setAttribute("style", "background-color: blue");
      console.log("In the function");
  }

document.getElementById("menu").addEventListener("click", displayMenu);*/
