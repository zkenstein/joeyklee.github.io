﻿function init() {

        // var map = L.map('map', {
        //     center: [49.26, -123.10],
        //     zoom: 13,
        //     //minZoom:10,
        //     //maxZoom:20,
        //     attributionControl: true,
        //     zoomControl: true
        // });

        L.mapbox.accessToken = 'pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw';
        var map = L.mapbox.map('map', 'mapbox.streets',{
            zoomControl: false
        }).setView([49.26, -123.10], 13);

        map.on('ready', function(){
            new L.Control.MiniMap(L.mapbox.tileLayer('mapbox.streets'), {
                position:'topright', 
                width:200, 
                height:200,
                zoomLevelOffset: -3,
                aimingRectOptions:{
                    fillOpacity:0.05,
                    stroke:2,
                    color: '#FF9966'
                }
            }).addTo(map);
        })

        // var googleLayer = new L.Google('ROADMAP');
        // map.addLayer(googleLayer);

        // map.addLayer('mapbox.streets');

        // var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     maxZoom: 19,
        //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // }).addTo(map);
        // var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
        //     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        //     subdomains: 'abcd',
        //     minZoom: 0,
        //     maxZoom: 20,
        //     ext: 'png'
        // }).addTo(map);

        var marker = L.marker([49.221076, -123.069158]).addTo(map);

        var studyarea = 'data/studyarea.geojson';
        d3.json(studyarea, function(data) {
            console.log(data);

            function style(feature) {
                return {
                    weight: 4,
                    color: "#FF3300",
                    opacity: 0.5,
                    fillOpacity: 0
                };
            };

            L.geoJson(data, {
                style: style
            }).addTo(map);

        }); // end d3


        var way_1641 = L.layerGroup();
        var way_0205 = L.layerGroup();
        var way_0150 = L.layerGroup();
        var way_0151 = L.layerGroup();
        var way_0108 = L.layerGroup();

        var ifile = {
            "1641": 'data/1641_1.geojson',
            "0205": 'data/0205_1.geojson',
            "0150": 'data/0150_1.geojson',
            "0151": 'data/0151_1.geojson',
            "0108": 'data/0108_1.geojson'
        };
        var waycolor = '#3366FF';

        loadRoute(ifile["1641"], '#7519FF', way_1641);
        loadRoute(ifile["0205"], '#CC33FF', way_0205);
        loadRoute(ifile["0150"], '#006600', way_0150);
        loadRoute(ifile["0151"], '#003366', way_0151);
        loadRouteMulti(ifile["0108"], '#FF0000', way_0108);

        var baseMaps = {
            "Andreas: 1641": way_1641,
            "Thea: 0205": way_0205,
            "Alex: 0150": way_0150,
            "Mark: 0151": way_0151,
            "Joey: 0108": way_0108
        };

        L.control.layers(baseMaps, null).addTo(map);

        function loadRoute(ifile, waycolor, layerobject) {
            d3.json(ifile, function(data) {
                // console.log(data.features[0].geometry.coordinates);
                var coords = data.features[0].geometry.coordinates;

                var newcoords = [];
                coords.forEach(function(d) {
                    var temp = [d[1], d[0]];
                    newcoords.push(temp);
                });

                var pathPattern = L.polylineDecorator(newcoords, {
                    patterns: [{
                        offset: 0,
                        repeat: 10,
                        symbol: L.Symbol.dash({
                            pixelSize: 5,
                            pathOptions: {
                                color: waycolor,
                                weight: 3,
                                opacity: 0.75
                            }
                        })
                    }, {
                        offset: 25,
                        repeat: 100,
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 10,
                            pathOptions: {
                                color: waycolor,
                                fillOpacity: 1,
                                weight: 0
                            }
                        })
                    }]
                }).addTo(layerobject);
            }); // end d3
        };

        function loadRouteMulti(ifile, waycolor, layerobject) {
            d3.json(ifile, function(data) {
                // console.log(data.features[0].geometry.coordinates);
                var coords = data.features[0].geometry.coordinates;

                var newcoords = [];
                coords.forEach(function(d) {
                    // console.log(d)
                    d.forEach(function(e) {
                        // console.log(e);
                        var temp = [e[1], e[0]];
                        newcoords.push(temp);
                    })
                })

                var pathPattern = L.polylineDecorator(newcoords, {
                    patterns: [{
                        offset: 0,
                        repeat: 10,
                        symbol: L.Symbol.dash({
                            pixelSize: 5,
                            pathOptions: {
                                color: waycolor,
                                weight: 3,
                                opacity: 0.75
                            }
                        })
                    }, {
                        offset: 25,
                        repeat: 100,
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 10,
                            pathOptions: {
                                color: waycolor,
                                fillOpacity: 1,
                                weight: 0
                            }
                        })
                    }]
                }).addTo(layerobject);
            }); // end d3
        };



    } // end init()

// var map = new L.Map('map', {
//     center: [49.26, -123.10],
//     zoom: 13,
//     layers: [
//         new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
//             attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
//             maxZoom: 18,
//             subdomains: '1234'
//         })
//     ]
// });
// var CEE_base_grey = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
//         maxZoom: 15,
//         minZoom: 10,
//         zIndex:1,
//        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//         subdomains: 'abcd',
//     }).addTo(map); 


// // --- Arrow, with animation to demonstrate the use of setPatterns ---
// var arrow = L.polyline([[57, -19], [60, -12]], {}).addTo(map);
// var arrowHead = L.polylineDecorator(arrow).addTo(map);

// var arrowOffset = 0;
// var anim = window.setInterval(function() {
//     arrowHead.setPatterns([
//         {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})}
//     ])
//     if(++arrowOffset > 100)
//         arrowOffset = 0;
// }, 100);

// // --- Polygon ---
// var polygon = L.polygon([[54, -6], [55, -7], [56, -2], [55, 1], [53, 0], [54, -6]], {color: "#ff7800", weight: 1}).addTo(map);
// var pd = L.polylineDecorator(polygon, {
//     patterns: [
//         {offset: 0, repeat: 10, symbol: L.Symbol.dash({pixelSize: 0})}
//     ]
// }).addTo(map);

// // --- Multi-pattern without Polyline ---    
// var pathPattern = L.polylineDecorator(
//     [ [ 49.543519, -12.469833 ], [ 49.808981, -12.895285 ], [ 50.056511, -13.555761 ], [ 50.217431, -14.758789 ], [ 50.476537, -15.226512 ], [ 50.377111, -15.706069 ], [ 50.200275, -16.000263 ], [ 49.860606, -15.414253 ], [ 49.672607, -15.710152 ], [ 49.863344, -16.451037 ], [ 49.774564, -16.875042 ], [ 49.498612, -17.106036 ], [ 49.435619, -17.953064 ], [ 49.041792, -19.118781 ], [ 48.548541, -20.496888 ], [ 47.930749, -22.391501 ], [ 47.547723, -23.781959 ], [ 47.095761, -24.941630 ], [ 46.282478, -25.178463 ], [ 45.409508, -25.601434 ], [ 44.833574, -25.346101 ], [ 44.039720, -24.988345 ] ],
//     {
//         patterns: [
//             { offset: 12, repeat: 25, symbol: L.Symbol.dash({pixelSize: 10, pathOptions: {color: '#f00', weight: 2}}) },
//             { offset: 0, repeat: 25, symbol: L.Symbol.dash({pixelSize: 0}) }
//         ]
//     }
// ).addTo(map);

// // --- Markers proportionnaly located ---   
// var markerLine = L.polyline([[58.44773, -28.65234], [52.9354, -23.33496], [53.01478, -14.32617], [58.1707, -10.37109], [59.68993, -0.65918]], {}).addTo(map);
// var markerPatterns = L.polylineDecorator(markerLine, {
//     patterns: [
//         { offset: '5%', repeat: '10%', symbol: L.Symbol.marker()}
//     ]
// }).addTo(map);

// --- Example with a rotated marker --- 
// var pathPattern = L.polylineDecorator(
//     [ [ 42.9, -15 ], [ 44.18, -11.4 ], [ 45.77, -8.0 ], [ 47.61, -6.4 ], [ 49.41, -6.1 ], [ 51.01, -7.2 ] ],
//     {
//         patterns: [
//             { offset: 0, repeat: 10, symbol: L.Symbol.dash({pixelSize: 5, pathOptions: {color: '#000', weight: 1, opacity: 0.2}}) },
//             { offset: '16%', repeat: '33%', symbol: L.Symbol.marker({rotate: true, markerOptions: {
//                 icon: L.icon({
//                     iconUrl: 'icon_plane.png',
//                     iconAnchor: [16, 16] 
//                 })
//             }})}
//         ]
//     }
// ).addTo(map);

//     // --- Example with a rotated marker --- 
// var pathPattern = L.polylineDecorator(
//     [ [ 42.9, -15 ], [ 44.18, -11.4 ], [ 45.77, -8.0 ], [ 47.61, -6.4 ], [ 49.41, -6.1 ], [ 51.01, -7.2 ] ],
//     {
//         patterns: [
//         { offset: 0, repeat: 10, symbol: L.Symbol.dash({pixelSize: 5, pathOptions: {color: '#000', weight: 1, opacity: 0.2}}) },
//         {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0}})}
//     ]
//     }
// ).addTo(map);

// // --- Example with an array of Polylines ---
// var multiCoords1 = [
//     [[47.5468, -0.7910], [48.8068, -0.1318], [49.1242, 1.6699], [49.4966, 3.2958], [51.4266, 2.8564], [51.7542, 2.1093]], 
//     [[48.0193, -2.8125], [46.3165, -2.8564], [44.9336, -1.0107], [44.5278, 1.5820], [44.8714, 3.7353], [45.8287, 5.1855], [48.1953, 5.1416]], 
//     [[45.9205, 0.4394], [46.7699, 0.9228], [47.6061, 2.5488], [47.7540, 3.3837]]
// ];
// var plArray = [];
// for(var i=0; i<multiCoords1.length; i++) {
//     plArray.push(L.polyline(multiCoords1[i]).addTo(map));
// }
// L.polylineDecorator(multiCoords1, {
//     patterns: [
//         {offset: 25, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0}})}
//     ]
// }).addTo(map);

// // --- Example with a MultiPolygon ---
// var multiCoords2 = [
//     [[55.4788, 4.1748], [53.7487, 4.5263], [52.4560, 7.3388], [56.3165, 7.8662]],
//     [[53.9302, 9.2724] , [52.8027, 9.8876], [52.1604, 12.0849], [53.5141, 14.5019], [54.9523, 14.3261], [55.5037, 10.5908]]
// ];
// var multiPl = L.multiPolygon(multiCoords2, {weight: 0, fillOpacity: 0}).addTo(map);
// L.polylineDecorator(multiPl, {
//     patterns: [
//         {offset: 0, repeat: 10, symbol: L.Symbol.dash({pixelSize: 0, pathOptions: {color: '#080'}})}
//     ]
// }).addTo(map);