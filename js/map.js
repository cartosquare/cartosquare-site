var mymap = L.map('map-container').setView([39.9, 116.3], 10);

var mapid = 0;

$.get('/backend/visit', function(data) {
    console.log('你是第' + data.key + '个制图者！');
    mapid = parseInt(data.key);
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors>',
    subdomains: ['a','b','c'],
    zoomControl: false
}).addTo(mymap);
});

