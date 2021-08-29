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

//Declare Icons
const bluAFIcon = L.icon({
    iconUrl: './dist/icons/blueairfield.png',
    iconSize: [35,35]
})
const bluTrpIcon = L.icon({
    iconUrl: './dist/icons/bluefronttroops.png',
    iconSize: [40,40]
})
const bluTrainIcon = L.icon({
    iconUrl: './dist/icons/bluetrain.png',
    iconSize: [75,75]
})
const bluBrdgeIcon = L.icon({
    iconUrl: './dist/icons/bluebridge.png',
    iconSize: [45,45]
})
const bluDepotIcon = L.icon({
    iconUrl: './dist/icons/bluedepot.png',
    iconSize: [50,50]
})
const redAFIcon = L.icon({
    iconUrl: './dist/icons/redairfield.png',
    iconSize: [35,35]
})
const redTrpIcon = L.icon({
    iconUrl: './dist/icons/redfronttroops.png',
    iconSize: [40,40]
})
const redTrainIcon = L.icon({
    iconUrl: './dist/icons/redtrain.png',
    iconSize: [75,75]
})
const redDepotIcon = L.icon({
    iconUrl: './dist/icons/reddepot.png',
    iconSize: [50,50]
})
const redBrdgeIcon = L.icon({
    iconUrl: './dist/icons/redbridge.png',
    iconSize: [45,45]
})

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
            if(distance > 2){
                new L.marker(midpoint,{
                    opacity: 1,
                    icon: L.divIcon({
                        className: 'midpoint-label',
                        html: `<b>${heading}°|${distance}km</b>`
                    })
                }).addTo(map)
            }
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
  //Converts Server JSON (lat,lng) points to respective point on map
  function convertServerToMap(y,x){
    y -= 192.1;
    y *= 1.33333333333333;
    x *= 1.33333333333333;
    return [y,x]
}


//Parses Server json and populates map accordingly
let serverPoints = populateMap()

//Parse JSON and add markers to map
async function populateMap(){
      const res = await fetch('output.json')
      const data = await res.json()
      let serverMarkers = []
      //Loops through points object from servers json
      data.points.forEach(i => {
        let acceptedTypes = ['taw-depo','taw-bridge','taw-def','taw-af','base','taw-train']
        let y = i.latLng.lat
        let x = i.latLng.lng
        let type = i.type
        //Checks if Accepted Type is found in points object
        if(acceptedTypes.includes(type)){
            //By default taw-af has no name, so we assign it the name of Airfield
            if(type == 'taw-af'){
                i.name = 'Airfield'
            }
            //Pushes values that passed the check as an object to our server markers array
            serverMarkers.push(
                {
                    lat: y.toFixed(2),
                    lng: x.toFixed(2),
                    type: i.type,
                    color: i.color,
                    name: i.name,
                    notes: i.notes,
                })
        }
    })
    drawFrontline(data)
    getCustomIcon(serverMarkers)
  }
//Assigns a custom icon based off of serverMarkers value
function getCustomIcon(serverMarkers){
    serverMarkers.forEach(point => {
        //Converts server json lat,lng to its respective lat,lng on the map
        let y = point.lat
        let x = point.lng
        let markerCoords = convertServerToMap(y,x)
        let labelCoords = markerCoords
        //Determines what type of marker the coordinates are
        let type = point.type
        let name = point.name.toUpperCase()
        //Pre Declaring selectIcon (Will be updated with a value in the switch statement)
        let selectIcon
        if(point.name != 'DESTROYED'){
            if(type != 'taw-af'){
                createLabel(labelCoords,name)
            }
        //Determines what type of icon to give the marker
        switch (type) {
            case 'taw-af':
                if(point.color === 'red'){
                    selectIcon = redAFIcon
                }else{
                    selectIcon = bluAFIcon
                }
                createCustomIcon(markerCoords,selectIcon)
                break;
            case 'taw-def':
                if(point.color === 'red'){
                    selectIcon = redTrpIcon
                }else{
                    selectIcon = bluTrpIcon
                }
                createCustomIcon(markerCoords,selectIcon)
                break;
            case 'base':
                if(point.color === 'red'){
                    selectIcon = redDepotIcon
                }else{
                    selectIcon = bluDepotIcon
                }
                createCustomIcon(markerCoords,selectIcon)
                break;
            case 'taw-train':
                if(point.color === 'red'){
                    selectIcon = redTrainIcon
                }else{
                    selectIcon = bluTrainIcon
                }
                createCustomIcon(markerCoords,selectIcon)
                break;
            case 'taw-depo':
                if(point.color === 'red'){
                    selectIcon = redDepotIcon
                }else{
                    selectIcon = bluDepotIcon
                }
                createCustomIcon(markerCoords,selectIcon)
                break;
            case 'taw-bridge':
                if(point.color === 'red'){
                    selectIcon = redBrdgeIcon
                }else{
                    selectIcon = bluBrdgeIcon
                }
                createCustomIcon(markerCoords,selectIcon)
                break;   
            default:
                console.log("No marker selected")
                console.log(type)
                break;
        }
        }
    })
}
//Creates a marker with a custom icon for getCustomIcon()
function createCustomIcon(markerCoords,selectIcon){
    new L.marker(markerCoords,{
        icon: selectIcon,
        interactive:false
    }).addTo(map)
}

function createLabel(labelCoords,name){
    new L.marker(labelCoords,{
        icon:L.divIcon({
            html: `<b>${name}</b>`,
            className: 'icon-label'
        }),
        interactive:false
    }).addTo(map)
}

//Uses passed data from the server to draw the frontline
function drawFrontline(data){
    data.frontline.forEach(frontline => {
        let blueFrontline = []
        let redFrontline = []

        //Blue Axis Frontline
        frontline[0].forEach(coords => {
            let y = coords[0]
            let x = coords[1]
            //Converts JSON Frontline Coordinates to respective Map Coordinates
            let blueCoords = convertServerToMap(y,x)
            //Pushes coordinates to Blue Frontline Array
            blueFrontline.push(blueCoords)
            //Creates marker at blue coordinate and adds to map
            new L.marker(blueCoords,{
                icon:L.divIcon({
                    opacity: 0
                }),
                opacity: 0,
                interactive:false
            }).addTo(map)
            //Connects all blueFrontline coordinates together with a polyline
            L.polyline(blueFrontline,{color:'blue',weight:2,smoothFactor:3,interactive:false}).addTo(map)
        })

        //Red Allied Frontline
        frontline[1].forEach(coords => {
            let y = coords[0]
            let x = coords[1]
            //Converts JSON Frontline Coordinates to respective Map Coordinates
            let redCoords = convertServerToMap(y,x)
            //Pushes coordinates to Red Frontline Array
            redFrontline.push(redCoords)
            //Creates marker at red coordinate and adds to map
            new L.marker(redCoords,{
                icon:L.divIcon({
                    opacity: 0
                }),
                opacity: 0,
                interactive:false
            }).addTo(map)
            //Connects all redFrontline coordinates together with a polyline
            L.polyline(redFrontline,{color:'red',weight:2,smoothFactor:3,interactive:false}).addTo(map)
        })
   })
}

