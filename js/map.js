var mymap = L.map('map-container').setView([39.9, 116.3], 10);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors>',
    subdomains: ['a','b','c'],
    zoomControl: false
}).addTo(mymap);
