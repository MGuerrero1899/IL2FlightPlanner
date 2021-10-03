//Gets current page
const currentPage = window.location.pathname
//Nav Bar Hamburger Icon
const toggleBtn = document.querySelector('.toggle-btn');
//Nav Links
const navLinks = document.querySelector('.nav-link');
switch(currentPage){
    case '/':
        const mapSettings = {
            Moscow:{
                fullName: 'Moscow',
                name: 'moscow',
                hash: '#moscow', //Selected map hash value
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
                latOffset: 256, //Latitude offset of the map in order to find correct heading (Prevents negative latitude) Calculation is 256 + height border difference
                latScale: 9, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
                lngScale: 9, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
                scale: 1.33333333333333,
                originalSize: 192.1,
                mapCenter:[-128,127],
                tiles: "dist/new_moscow/{z}/{x}/{y}.png" //location of tiles for selected map
            },
            Kuban:{
                fullName: 'Kuban',
                name: 'kuban',
                hash: '#kuban',
                indexID: 1,
                latMin: -216,//Bottom left latitude
                latMax: -40,//Top Right latitude
                latGridMax: 29,//Total number of grids tall
                lngMin: 0,//Bottom Left longitude
                lngMax: 256,//Top Right Longitude
                lngGridMax: 42,//Total number of grids wide
                defaultZoom: 4,
                minZoom: 3,
                maxZoom: 5,
                latOffset: 336,//Latitude offset of the map in order to find correct heading (Prevents negative latitude)
                latScale: 6, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
                lngScale: 6, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
                scale: 1.79,
                originalSize: 218,
                mapCenter:[-120,120],
                tiles: "dist/new_kuban/{z}/{x}/{y}.png" //location of tiles for selected map
            },
            Stalingrad:{
                fullName: 'Stalingrad',
                name: 'stalingrad',
                hash: '#stalingrad',
                indexID: 2,
                latMin: -210,//Bottom left latitude
                latMax: -45,//Top Right latitude
                latGridMax: 23,//Total number of grids tall
                lngMin: 0,//Bottom Left longitude
                lngMax: 256,//Top Right Longitude
                lngGridMax: 42,//Total number of grids wide
                defaultZoom: 4,
                minZoom: 3,
                maxZoom: 5,
                latOffset: 346,//Latitude offset of the map in order to find correct heading (Prevents negative latitude)
                latScale: 7, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
                lngScale: 7, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
                scale: 1,
                originalSize: 210.6,
                mapCenter:[-138,142],
                tiles: "dist/new_stalingrad/{z}/{x}/{y}.png" //location of tiles for selected map
            },
            Rheinland:{
                fullName: 'Rheinland',
                name: 'rheinland',
                hash: '#rheinland',
                indexID: 3,
                latMin: -231,//Bottom left latitude
                latMax: -24,//Top Right latitude
                latGridMax: 32,//Total number of grids tall
                lngMin: 0,//Bottom Left longitude
                lngMax: 256,//Top Right Longitude
                lngGridMax: 40,//Total number of grids wide
                defaultZoom: 4,
                minZoom: 3,
                maxZoom: 6,
                latOffset: 304,//Latitude offset of the map in order to find correct heading (Prevents negative latitude) formula is (latMax * 2) + 256
                latScale: 6, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
                lngScale: 6, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
                scale: 1.8473,
                originalSize: 126.05,
                mapCenter:[-123,115],
                tiles: "./dist/new_rheinland/{z}/{x}/{y}.png" //location of tiles for selected map
            },
            Luki:{
                fullName: 'Luki',
                name: 'luki',
                hash: '#luki',
                indexID: 4,
                latMin: -208,//Bottom left latitude
                latMax: -48,//Top Right latitude
                latGridMax: 10,//Total number of grids tall
                lngMin: 0,//Bottom Left longitude
                lngMax: 256,//Top Right Longitude
                lngGridMax: 17,//Total number of grids wide
                defaultZoom: 4,
                minZoom: 3,
                maxZoom: 5,
                latOffset: 306,//Latitude offset of the map in order to find correct heading (Prevents negative latitude) formula is (latMax * 2) + 256
                latScale: 14, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
                lngScale: 14, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
                mapCenter:[-117,122],
                tiles: "./dist/new_luki/{z}/{x}/{y}.png" //location of tiles for selected map
            },
            Arras:{
                fullName: 'Arras',
                name: 'arras',
                hash: '#arras',
                indexID: 5,
                latMin: -208,//Bottom left latitude
                latMax: -48,//Top Right latitude
                latGridMax: 10,//Total number of grids tall
                lngMin: 0,//Bottom Left longitude
                lngMax: 256,//Top Right Longitude
                lngGridMax: 17,//Total number of grids wide
                defaultZoom: 4,
                minZoom: 2,
                maxZoom: 5,
                latOffset: 306,//Latitude offset of the map in order to find correct heading (Prevents negative latitude) formula is (latMax * 2) + 256
                latScale: 20, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
                lngScale: 20, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
                mapCenter:[-117,122],
                tiles: "./dist/new_arras/{z}/{x}/{y}.png" //location of tiles for selected map
            },
            Prokhorovka:{
                fullName: 'Prokhorovka',
                name: 'prokhorovka',
                hash: '#prokhorovka',
                indexID: 6,
                latMin: -256,//Bottom left latitude
                latMax: -0,//Top Right latitude
                latGridMax: 11,//Total number of grids tall
                lngMin: 0,//Bottom Left longitude
                lngMax: 256,//Top Right Longitude
                lngGridMax: 11,//Total number of grids wide
                defaultZoom: 4,
                minZoom: 2,
                maxZoom: 5,
                latOffset: 256,//Latitude offset of the map in order to find correct heading (Prevents negative latitude) formula is (latMax * 2) + 256
                latScale: 22, //This is the latitude scale of each grid in game (Each grid in game is 10km tall)
                lngScale: 22, //This is the longitude scale of each grid in game (Each grid in game is 10km wide)
                mapCenter:[-117,122],
                tiles: "./dist/new_prokhorovka/{z}/{x}/{y}.png" //location of tiles for selected map
            }
        }
        //Declare Icons
        const mapIcons = {
            bluAFIcon: L.icon({
                iconUrl: './dist/icons/blueairfield.png',
                iconSize: [35,35]
            }),
            bluTrpIcon: L.icon({
                iconUrl: './dist/icons/bluefronttroops.png',
                iconSize: [40,40]
            }),
            bluTrainIcon: L.icon({
                iconUrl: './dist/icons/bluetrain.png',
                iconSize: [75,75]
            }),
            bluBrdgeIcon: L.icon({
                iconUrl: './dist/icons/bluebridge.png',
                iconSize: [45,45]
            }),
            bluDepotIcon: L.icon({
                iconUrl: './dist/icons/bluedepot.png',
                iconSize: [50,50]
            }),
            redAFIcon: L.icon({
                iconUrl: './dist/icons/redairfield.png',
                iconSize: [35,35]
            }),
            redTrpIcon: L.icon({
                iconUrl: './dist/icons/redfronttroops.png',
                iconSize: [40,40]
            }),
            redTrainIcon: L.icon({
                iconUrl: './dist/icons/redtrain.png',
                iconSize: [75,75]
            }),
            redDepotIcon: L.icon({
                iconUrl: './dist/icons/reddepot.png',
                iconSize: [50,50]
            }),
            redBrdgeIcon: L.icon({
                iconUrl: './dist/icons/redbridge.png',
                iconSize: [45,45]
            }),
            bluShipIcon: L.icon({
                iconUrl: './dist/icons/blueships.png',
                iconSize: [55,55]
            }),
            redShipIcon: L.icon({
                iconUrl: './dist/icons/redships.png',
                iconSize: [55,55]
            })
        }
        const waypointIcons = [
            './dist/icons/waypoint.png',
            './dist/icons/takeoff.png',
            './dist/icons/landing.png',
            './dist/icons/bombtarget.png'
        ]
        flightPlanner(mapSettings,mapIcons,waypointIcons)
        break;
    case '/contact':
        toggleBtn.addEventListener('click',() => {
            navLinks.classList.toggle('active');
        })
        break;
}

function flightPlanner(mapSettings,mapIcons,waypointIcons){
    //HTML Elements
    const button = document.querySelector('.recenter-btn');
    const speedInput = document.querySelector('.flight-speed');
    const mapChoice = document.querySelector('.mapchoice');
    const newFlight = document.querySelector('.newflight');
    const clearFlight = document.querySelector('.clearflight')
    const waypointSelector = document.querySelector('.waypointicon')
    const currIcon =  document.querySelector('.waypoint-icon');
    const mapSelectDiv = document.querySelector('.map-select')
    const inputContainer = document.querySelector('.input-container')
    const convertSpeed = document.querySelector('.convertspeed')
    const speedLabel = document.querySelector('.speed-label');
    const openToolbar = document.querySelector('.toolbar-btn');
    const closeToolbar = document.querySelector('.toolbar-close');
    const confirmFlight = document.querySelector('#confirm-flight');
    const confirmContainer = document.querySelector('.flight-controls')

    //Gets Map Object Settings based on Map choice value
    function findMap(obj,hash){
        for(let i in obj){
            if(typeof obj[i] === 'object'){
                for(let j in obj[i]){
                    if(obj[i][j] === hash){
                        return obj[i]
                    }
                }
            }
        }
    }
    //Clears map when map is changed
    function clearMap(){
        //Resets all marker arrays
        markerCoords = []
        serverMarkers = []
        blueFrontline = []
        redFrontline = []
        //Removes old map tiles
        map.removeLayer(mapTiles)
        //Removes all markers from map
        flightPlan.clearLayers();
        redAFLayer.clearLayers();
        bluAFLayer.clearLayers();
        targetGroup.clearLayers();
        frontlineLayer.clearLayers();
    }
    function shiftButton(){
        if(navLinks.classList.contains('active')){
            if(window.innerWidth <= 1024 && window.innerWidth >= 640){
                mapSelectDiv.style.top = '115px'
                inputContainer.style.bottom = '-50px'
            }else{
                mapSelectDiv.style.top = '145px'
                //inputContainer.style.top = '320px'
            }
        }else{
            if(window.innerWidth > 1024){
                mapSelectDiv.style.top = '70px'
            }else if(window.innerWidth <= 1024 && window.innerWidth >= 640){
                mapSelectDiv.style.top = '65px'
                inputContainer.style.bottom = '10px'
            }else{
                mapSelectDiv.style.top = '50px'
                inputContainer.style.bottom = '0'
            }
        }
        
    }
    //Default Map loaded is stalingrad
    let mapIndex = mapSettings.Stalingrad;
    //Default speed measurement
    let speedMeasurement = ' km/h';
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
    let mapTiles = L.tileLayer(mapIndex.tiles, {
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

    //Finds new map index everytime map is changed via dropdown
    mapChoice.addEventListener('change',async() => {
        if(mapChoice.value === '#finnish'){
            //Fetches finnish server json
            let data = await fetchData();
            mapChoice.value = data.mapHash;
            //Gets server marker locations
            populateMap();
        }
        //Sets map to changed map value
        mapIndex = findMap(mapSettings, mapChoice.value);
        //Clears the map for new tiles
        clearMap();
        //Instantiates new selected map tiles
        mapTiles = L.tileLayer(mapIndex.tiles, {
            minZoom: mapIndex.minZoom,
            maxZoom : mapIndex.maxZoom,
            noWrap: true,
            continuousWorld: false,
            bounds:bounds
        }).addTo(map)
        map.setView(mapIndex.mapCenter,mapIndex.defaultZoom)
    })
    //Recenters Map
    button.addEventListener('click', () => {
        map.setView(mapIndex.mapCenter,mapIndex.defaultZoom)
    })
    //Opens toolbar
    openToolbar.addEventListener('click',() => {
        inputContainer.classList.add('active')
    })
    //Closes toolbar
    closeToolbar.addEventListener('click',() => {
        inputContainer.classList.remove('active')
    })
    //Toggles hamburger nav icon
    toggleBtn.addEventListener('click',() => {
        navLinks.classList.toggle('active');
        shiftButton()
    })
    //Detects if window size changes
    window.addEventListener('resize',()=> {
        if(navLinks.classList.contains('active') && window.innerWidth > 1024){
            navLinks.classList.toggle('active');
        }
        shiftButton()
    })
    convertSpeed.addEventListener('click',() => {
        if(isImperial()){
            convertSpeed.classList.remove('active');
            speedMeasurement = 'km/h';
            speedLabel.textContent = 'Current Airspeed (km/h)';
            convertSpeed.textContent = 'MPH';
        }else{
            convertSpeed.classList.toggle('active');
            speedMeasurement = 'mph';
            speedLabel.textContent = 'Current Airspeed (mph)'
            convertSpeed.textContent = 'KM/H';
        }
    })
    //Creates new flight
    newFlight.addEventListener('click',() => {
        isFlightConfirmed = false;
        confirmContainer.classList.add('active');
        createFlightPlan()
    })
    //Clears flight
    clearFlight.addEventListener('click',()=> {
        clearFlightPlan()
    })
    //Confirms flight
    confirmFlight.addEventListener('click', () => {
        markerCoords = [];
        speed = [];
        speedInput.value = 300;
        isFlightConfirmed = true;
        confirmContainer.classList.remove('active');
    })
    //Bool if flight has been confirmed finished or not
    let isFlightConfirmed = false;
    //Array of speed for each marker (Fixes issue of all markers being assigned same speed)
    let speed = [];
    //Array of marker coordinates
    let markerCoords = [];
    //Array of server markers
    let serverMarkers = [];
    //Array of frontline coords
    let blueFrontline = [];
    let redFrontline = [];
    //Sets Default Waypoint Marker
    let waypointMarker = waypointIcons[0];
    let count = 1;
    //Swaps through waypoints till selected
    waypointSelector.addEventListener('click',() =>{
        currIcon.style.backgroundImage = `url(${waypointIcons[count]})`
        waypointMarker = waypointIcons[count]
        count++
        if(count === waypointIcons.length){
            count = 0
        }
    })
    //Allows toggling on and off FLight Plan markers on map
    let flightPlan = L.layerGroup().addTo(map)

    function createFlightPlan(){
        //Creates marker based on clicked location of map
        map.on('click',(e) => {
            //If new flight hasnt been started exit
            if(isFlightConfirmed){
                return
            }
            //Declares speed as speedInput value (Default value is 300kmph)
            let currSpeed = speedInput.value
            speedInput.addEventListener('change',() => {
                currSpeed = speedInput.value
            })
            speed.push(currSpeed)
            //Creates marker object and pushes it to the marker coordinates array
            let point = new L.marker(e.latlng,{
                icon: L.icon({
                    iconUrl: waypointMarker,
                    iconSize: [60,60],
                    iconAnchor: [25,50]
                })
            })
            let marker = {
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            }
            markerCoords.push(marker);
	    //markercoords debugging
            //console.log(markerCoords);
            //Adds a polyline to connect each point
            const polyline = L.polyline(markerCoords, {color: 'red',weight: '3',dashArray: '20,20'});
            //Adds marker and point to our FlightPlan
            flightPlan.addLayer(point);
            flightPlan.addLayer(polyline);
            //Determines if there are atleast two marker points on map
            if(markerCoords.length != 0){
                //Loops through marker coordinates array and calculates midpoint,heading, and distance
                for(let i = 0; i < markerCoords.length -1; i++){
                    let a = markerCoords[i];
                    let b = markerCoords[i + 1];
                    let midpoint = calcMidPoint(a,b);
                    let heading = calcHeading(a,b);
                    let distance = calcDistance(a,b);
                    let time = calcTime(speed[i+1],distance);
                    //if time is less than 1 min will display in seconds
                    let timeToTarget = time < .6 ? `${time*100}sec` : `${time.toFixed(0)} min|${speed[i+1]}${speedMeasurement}`;
                    let label = `${heading}°|${distance}km|${timeToTarget}`
                    if(isImperial()){
                        label = `${heading}°|${(distance * 0.62).toFixed(2)}mi|${timeToTarget}`
                    }
                    //Creates a transparent marker for the midpoint and sets text to display heading and distance
                    if(distance > 2){
                    let midpointMarker = new L.marker(midpoint,{
                            opacity: 1,
                            icon: L.divIcon({
                                className: 'midpoint-label',
                                html: label
                            })
                        })
                        flightPlan.addLayer(midpointMarker);
                    }
                }
            }
        })
    }
    //Tells if measurements are in metric or imperial
    function isImperial(){
        if(convertSpeed.classList.contains('active')){
            return true;
        }else{
            return false;
        }
    }
    //Clears flight plan on button push
    function clearFlightPlan(){
        markerCoords = []
        speed = [];
        speedInput.value = 300;
        flightPlan.clearLayers()
    }
    //Calculates MidPoint between two map points
    function calcMidPoint(a,b){
        let lat = (b.lat + a.lat) / 2;
        let lng = (a.lng + b.lng) / 2;
        return L.latLng([lat,lng])
    }
    //Calculates Heading between two map points
    function calcHeading(a,b){
        //Accounts for the offset of the map
        let latTwo = b.lat + mapIndex.latOffset;
        let latOne = a.lat + mapIndex.latOffset;

        let radians = Math.atan2(latTwo - latOne, b.lng - a.lng);
        let degrees = radians * 180 / Math.PI;
        let heading = geoToMagnetic(degrees);
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
    function calcDistance(a,b){
        let x = Math.floor(((b.lat - a.lat)/ mapIndex.latScale) * 10);
        let y = Math.floor(((b.lng - a.lng) / mapIndex.lngScale) * 10);
        let distance = Math.sqrt(x*x + y*y);
        return distance.toFixed(2)
    }
    function calcTime(speed,distance){
        //Seconds in an Hour
        const minInHr = 60;
        const miInKm = 0.6213;
        if(isImperial()){
            let totalMiles = distance * miInKm;
            let miPerMin = speed / minInHr;
            return totalMiles / miPerMin;
        }else{
            let kmPerMin = speed / minInHr;
            return distance / kmPerMin;
        }

    }
    //Converts Server JSON (lat,lng) points to respective point on map
    function convertServerToMap(y,x){
        if(mapIndex.indexID === 1){
            x *= mapIndex.scale;
            y *= mapIndex.scale;
            y -= mapIndex.originalSize;
            x -= .7; //lng shift (Specific for Kuban for some reason)
            return [y,x]
        }
        y -= mapIndex.originalSize; //Original Map Latitude Maxmimum
        y *= mapIndex.scale; //Original vs Leaflet map scale difference
        x *= mapIndex.scale; //Original vs Leaflet map scale difference
        return [y,x]
    }

    //fetches server json
    async function fetchData(){
        const res = await fetch ('https://pacific-eyrie-84854.herokuapp.com/http://stats.virtualpilots.fi:8000/static/output.json');
        const data = await res.json();
        return data
    }
    //Populates map with markers using server json
    async function populateMap(){
        let data = await fetchData()
        //Loops through points object from servers json
        data.points.forEach(i => {
            let acceptedTypes = ['taw-depo','taw-bridge','taw-def','taw-af','base','taw-train','target']
            let y = i.latLng.lat;
            let x = i.latLng.lng;
            let type = i.type;
            //Checks if Accepted Type is found in points object
            if(acceptedTypes.includes(type)){
                //By default taw-af has no name, so we assign it the name of Airfield
                if(type == 'taw-af'){
                    i.name = 'Airfield';
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
            let y = point.lat;
            let x = point.lng;
            let markerCoords = convertServerToMap(y,x);
            let labelCoords = markerCoords;
            //Determines what type of marker the coordinates are
            let type = point.type;
            let name = point.name.toUpperCase();
            //Pre Declaring selectIcon (Will be updated with a value in the switch statement)
            let selectIcon;
            if(point.name != 'DESTROYED'){
                if(type != 'taw-af'){
                    createLabel(labelCoords,name);
                }
            //Determines what type of icon to give the marker
            switch (type) {
                case 'taw-af':
                    if(point.color === 'red'){
                        selectIcon = mapIcons.redAFIcon;
                    }else{
                        selectIcon = mapIcons.bluAFIcon;
                    }
                    createCustomIcon(markerCoords,selectIcon)
                    break;
                case 'taw-def':
                    if(point.color === 'red'){
                        selectIcon = mapIcons.redTrpIcon;
                    }else{
                        selectIcon = mapIcons.bluTrpIcon;
                    }
                    createCustomIcon(markerCoords,selectIcon)
                    break;
                case 'base':
                    if(point.color === 'red'){
                        selectIcon = mapIcons.redDepotIcon;
                    }else{
                        selectIcon = mapIcons.bluDepotIcon;
                    }
                    createCustomIcon(markerCoords,selectIcon)
                    break;
                case 'taw-train':
                    if(point.color === 'red'){
                        selectIcon = mapIcons.redTrainIcon;
                    }else{
                        selectIcon = mapIcons.bluTrainIcon;
                    }
                    createCustomIcon(markerCoords,selectIcon)
                    break;
                case 'taw-depo':
                    if(point.color === 'red'){
                        selectIcon = mapIcons.redDepotIcon;
                    }else{
                        selectIcon = mapIcons.bluDepotIcon;
                    }
                    createCustomIcon(markerCoords,selectIcon)
                    break;
                case 'taw-bridge':
                    if(point.color === 'red'){
                        selectIcon = mapIcons.redBrdgeIcon;
                    }else{
                        selectIcon = mapIcons.bluBrdgeIcon;
                    }
                    createCustomIcon(markerCoords,selectIcon)
                    break;   
                case 'target':
                    if(point.color === 'red'){
                        selectIcon = mapIcons.redShipIcon;
                    }else{
                        selectIcon = mapIcons.bluShipIcon;
                    }
                    createCustomIcon(markerCoords,selectIcon)
                    break;
                default:
                    console.log("No marker selected");
                    console.log(type);
                    break;
            }
            }
        })
    }
    //Target Layer Group
    let targetGroup = L.layerGroup().addTo(map);
    //Allied airfield Layer Group
    let redAFLayer = L.layerGroup().addTo(map);
    //Axis Airfield Layer Group
    let bluAFLayer = L.layerGroup().addTo(map);
    //Creates a marker with a custom icon for getCustomIcon()
    function createCustomIcon(markerCoords,selectIcon){
        let iconURL = selectIcon.options.iconUrl;
        let marker = new L.marker(markerCoords,{
            icon: selectIcon,
            interactive:false
        })
        //Determines if marker is an airfield marker
        if(iconURL.includes('airfield')){
            //Adds marker to Allied or Axis based on icon URL substring
            iconURL.includes('blue') ? bluAFLayer.addLayer(marker) : redAFLayer.addLayer(marker);
        }else{
            //If not airfield adds marker to target layer
            targetGroup.addLayer(marker);
        }

    }
    //Creates a label with the name for the custom icon marker
    function createLabel(labelCoords,name){
        let markerLabel = new L.marker(labelCoords,{
            icon:L.divIcon({
                html: `<b>${name}</b>`,
                className: 'icon-label'
            }),
            interactive:false
        })
        targetGroup.addLayer(markerLabel);
    }
    //Creates frontline layer
    let frontlineLayer = L.layerGroup().addTo(map)
    //Uses passed data from the server to draw the frontline
    function drawFrontline(data){
        data.frontline.forEach(frontline => {
            //Blue Axis Frontline
            frontline[0].forEach(coords => {
                let y = coords[0]
                let x = coords[1]
                //Converts JSON Frontline Coordinates to respective Map Coordinates
                let blueCoords = convertServerToMap(y,x);
                //Pushes coordinates to Blue Frontline Array
                blueFrontline.push(blueCoords);
                //Creates marker at blue coordinate and adds to map
                let frontMarker = new L.marker(blueCoords,{
                    icon:L.divIcon({
                        opacity: 0
                    }),
                    opacity: 0,
                    interactive:false
                })
                //Connects all blueFrontline coordinates together with a polyline
                let frontPolyline = L.polyline(blueFrontline,{color:'blue',weight:2,smoothFactor:3,interactive:false});
                frontlineLayer.addLayer(frontMarker);
                frontlineLayer.addLayer(frontPolyline);
            })

            //Red Allied Frontline
            frontline[1].forEach(coords => {
                let y = coords[0]
                let x = coords[1]
                //Converts JSON Frontline Coordinates to respective Map Coordinates
                let redCoords = convertServerToMap(y,x);
                //Pushes coordinates to Red Frontline Array
                redFrontline.push(redCoords);
                //Creates marker at red coordinate and adds to map
                let frontMarker = new L.marker(redCoords,{
                    icon:L.divIcon({
                        opacity: 0
                    }),
                    opacity: 0,
                    interactive:false
                })
                //Connects all redFrontline coordinates together with a polyline
                let frontPolyline = L.polyline(redFrontline,{color:'red',weight:2,smoothFactor:3,interactive:false});
                frontlineLayer.addLayer(frontMarker);
                frontlineLayer.addLayer(frontPolyline);
            })
    })
    }
    //Controls Map Layer names
    let overlay = {
        'Flight-Plan':flightPlan,
        'Allied Airfields':redAFLayer,
        'Axis Airfields':bluAFLayer,
        'Targets':targetGroup,
        'Frontline':frontlineLayer
    }
    //Adds our layers to the map
    L.control.layers(null,overlay,{position:'bottomleft'}).addTo(map);
}