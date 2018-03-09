<body>           //not full HTML code, just example of implementation
	<div id="map"></div>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCThVz3ETqcjx0EtyNWvaUiV0UF4xHx5Ag&libraries=visualization">
//Site: https://developers.google.com/maps/documentation/javascript/get-api-key
//API key: AIzaSyCThVz3ETqcjx0EtyNWvaUiV0UF4xHx5Ag

var heatmapData = [ new google.maps.LatLng(37.782, -122.447),
					new google.maps.LatLng(37.782, -1220445),
					new google.maps.LatLng(37.785, -122.435) ];
	
var map;

map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 39.50, lng: -98.35} ,
	zoom: 5,
	mapTypeId: 'satellite'
});

var heatmap = new google.maps.visualization.HeatmapLayer({
	data: heatmapData,
	radius: 20,
});
heatmap.setMap(map);

</script>

<body>          //not full HTML code, just example of implementation