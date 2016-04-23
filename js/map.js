var mymap = L.map('map-container').setView([39.9, 116.3], 10);

var mapid = 0;
var tileVersion = 0;
var tileLayer;

$.get('/backend/visit', function (data) {
    console.log('你是第' + data.key + '个制图者！');
    mapid = parseInt(data.key);

    tileLayer = L.tileLayer('/tile/' + mapid + '/{z}/{x}/{y}&retina=1&{tileID}', {
        attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors>',
        zoomControl: false,
        tileID: function () { return tileVersion; }
    }).addTo(mymap);

    L.control.geocoder('search-Eg9AZ2m', {
        //bounds: true,
        //position: 'topright',
        //expanded: true,
        placeholder: '搜索地点'
    }).addTo(mymap);
});

