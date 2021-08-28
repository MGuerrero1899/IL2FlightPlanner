const mapSettings = {
    Moscow:{
        fullName: 'Moscow',
        name: 'moscow',
        hash: '#moscow',
        indexID: 0,
        latMin: -256,//Top left latitude
        latMax: 0, //Bottom Right latitude
        latGridMax: 28,//Total number of grids tall
        lngMin: 0,//Top Left longitude
        lngMax: 256,//Top Right Longitude
        lngGridMax: 28, //Total number of grids wide
        defaultZoom: 3,
        minZoom: 3,
        maxZoom: 5,
        latOffset: 256, //Latitude offset of the map in order to find correct heading (Prevents negative latitude)
        latScale: 9, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
        lngScale: 9, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
        mapCenter:[-128,127],
        tiles: "dist/new_moscow/{z}/{x}/{y}.png" //location of tiles for selected map
    },
    Kuban:{
        fullName: 'Kuban',
        name: 'kuban',
        hash: '#kuban',
        indexID: 1,
        latMin: -216,//Top left latitude
        latMax: -40,//Bottom Right latitude
        latGridMax: 29,//Total number of grids tall
        lngMin: 0,//Top Left longitude
        lngMax: 256,//Top Right Longitude
        lngGridMax: 42,//Total number of grids wide
        defaultZoom: 3,
        minZoom: 3,
        maxZoom: 5,
        latOffset: 336,//Latitude offset of the map in order to find correct heading (Prevents negative latitude)
        latScale: 9, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
        lngScale: 9, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
        mapCenter:[-126,-120],
        tiles: "dist/new_kuban/{z}/{x}/{y}.png" //location of tiles for selected map
    },
}

const button = document.querySelector('.create')

//Selected Map Index
let mapIndex = mapSettings.Moscow

//Declares SW and NE border of image map in pixels
let mapSW = [8192,0],
    mapNE = [0,8192],
    //Declares map bounds in latitude and longitude for tile layer (Prevents loading non existant tiles)
    bounds = new L.LatLngBounds([0,0],[-256,256])
//Declares map on a simple 2D coordinate system instead of based on the earth
const map = L.map('mapid',{
    crs: L.CRS.Simple,
    maxBoundsViscosity: 0.1,
    attribution: false,
}).setView(mapIndex.mapCenter,mapIndex.defaultZoom)

//Populates the map with tiles depending on the specified index
const mapTiles = L.tileLayer(mapIndex.tiles, {
    minZoom: mapIndex.minZoom,
    maxZoom : mapIndex.maxZoom,
    noWrap: true,
    continuousWorld: false,
    bounds:bounds
}).addTo(map)

//Sets Max Bounds for map 
/*map.setMaxBounds(new L.LatLngBounds(
    map.unproject(mapSW, map.getMaxZoom()),
    map.unproject(mapNE, map.getMaxZoom())
)) */

//Recenters Map
button.addEventListener('click', () => {
    map.setView(mapIndex.mapCenter,mapIndex.defaultZoom)
})

//Array of marker coordinates
let markerCoords = []
//Creates marker based on clicked location of map
map.on('click',(e) => {
    //Creates marker object and pushes it to the marker coordinates array
    new L.marker(e.latlng).addTo(map)
    let marker = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
    }
    markerCoords.push(marker)
    console.log(marker)
    //Adds a polyline to connect each point
    const polyline = L.polyline(markerCoords, {color: 'red'}).addTo(map)
    //Determines if there are atleast two marker points on map
    if(markerCoords.length != 0){
        //Loops through marker coordinates array and calculates midpoint,heading, and distance
        for(let i = 0; i < markerCoords.length -1; i++){
            let a = markerCoords[i];
            let b = markerCoords[i + 1];
            let midpoint = calcMidPoint(a,b)
            let heading = calcHeading(a,b)
            let distance = calculateDistance(a,b)

            //Creates a transparent marker for the midpoint and sets text to display heading and distance
            new L.marker(midpoint,{
                opacity: 1,
                icon: L.divIcon({
                    className: 'midpoint-label',
                    html: `<b>${heading}°|${distance}km</b>`
            })
            }).addTo(map)
        }
    }
})

//Calculates MidPoint between two map points
function calcMidPoint(a,b){
    let lat = (b.lat + a.lat) / 2;
    let lng = (a.lng + b.lng) / 2;
    return L.latLng([lat,lng])
}
//Calculates Heading between two map points
function calcHeading(a,b){
    //Accounts for the offset of the map
    let latTwo = b.lat + mapIndex.latOffset
    let latOne = a.lat + mapIndex.latOffset

    let radians = Math.atan2(latTwo - latOne, b.lng - a.lng)
    let degrees = radians * 180 / Math.PI;
    let heading = geoToMagnetic(degrees)
    return Math.round(heading)
}

//Turns angle to magnetic compass heading
function geoToMagnetic(degrees){
    if (degrees < 0) {
        degrees += 360;
    }
    return (450 - degrees) % 360;
}
//Calculates the distance between two points on the map
function calculateDistance(a,b){
    let x = Math.floor(((b.lat - a.lat)/ mapIndex.latScale) * 10)
    let y = Math.floor(((b.lng - a.lng) / mapIndex.lngScale) * 10)
    let distance = Math.sqrt(x*x + y*y)
    return distance.toFixed(2)
}

