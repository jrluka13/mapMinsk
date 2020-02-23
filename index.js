let x;
let y;
let arrayOfX = [];
let arrayOfY = [];
let profit = [];
let newX;
let newY;



let map = L.map('map', {
}).setView([38.908,35.420],6);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

function onMapClick(e) {
    console.log("Coordinates:" + e.latlng);
}

map.on('click', onMapClick);


let canvas = document.querySelector('canvas'),
  context = canvas.getContext('2d');
  // scale = 50,
  // minScale = 9,
  // maxScale = 200;
    
function drawGrid() {
  arrayOfX = [];
  arrayOfY = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
  newX = parseInt(document.updeteGrid.newX.value);
  newY = parseInt(document.updeteGrid.newY.value);
  context.beginPath();
  
  for ( x = 0; x <= canvas.width; x += newX) {
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
  }

  for ( y = 0; y <= canvas.height; y += newY) {
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
  }

  context.stroke();

  for ( x = 0; x <= canvas.width; x += newX) {
    arrayOfX.push(Math.floor(x));
  }

  for ( y = 0; y <= canvas.height; y += newY) {
    arrayOfY.push(Math.floor(y));
  }

}



// document.querySelector('#scaleInc').addEventListener('click', function() {
//    changeScale(scale - 5);
// });

// document.querySelector('#scaleDec').addEventListener('click', function() {
//   changeScale(scale + 5);
// });

document.getElementById('removeGreed').addEventListener('click',function(){
 
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.zIndex = '1';
});
document.getElementById('returnGreed').addEventListener('click',function(){
  
  drawGrid();
  canvas.style.zIndex = '4';
})

// function changeScale(newScale) {
//   scale = Math.max(minScale, Math.min(newScale, maxScale));
//   drawGrid();
// }

canvas.onmousedown = function (event) {
  x = event.offsetX;
  y = event.offsetY;
};

canvas.onmouseup = function (event) {
  
  for (let i = 0; i < arrayOfX.length; i++) {
      if (x <= arrayOfX[i + 1] && x >= arrayOfX[i]) {
          profit.push(arrayOfX[i]);
      }
  }
  for (let i = 0; i < arrayOfY.length; i++) {
      if (y <= arrayOfY[i + 1] && y >= arrayOfY[i]) {
          profit.push(arrayOfY[i]);
      }
  }
  context.rect(profit[0] + 0.5, profit[1], newX, newY);
  context.fillStyle = "red";
  context.fill();
  profit = [];

};

// var marker = new L.Marker([40.9032,29.3132]);
// map.addLayer(marker);
// var items = [{
  
//   lat: "40.9963",
//   lon: "39.7808"
// }];

// drawData();

// function drawData() {
//   var item, o;
//   //draw markers for all items
//   for (item in items) {
//       o = items[item];
//       var loc = new L.LatLng(o.lat, o.lon);
//       createPolyLine(loc,[40.9032,29.3132]);
//   }
// }

function createPolyLine(loc1, loc2) {

  var latlongs = [loc1, loc2];
  var polyline = new L.Polyline(latlongs, {
      color: 'green',
      opacity: 1,
      weight: 1,
      clickable: false
  }).addTo(map);
 
  var s = 'About ' + (loc1.distanceTo(loc2) / 1000).toFixed(0) + 'km away from you.</p>';

  var marker = L.marker(loc1).addTo(map);
  if (marker) {
      marker.bindPopup(s);
  }
}
L.Icon.Default.prototype.options = {
  iconUrl: 'whatever.png',
  iconSize: [20, 70],
  iconAnchor: [10, 70],
 
}

var iconPlane = L.icon({
  iconUrl:'/проект/plane.png',
  iconSize: [48, 48],
  
});



//create polyline with gps coordinates
var pathPlane = L.polyline([
  [40.9032,29.3132],
  [40.9963,39.7808]
  

]);


function planefly(){
var marker = new L.Marker([40.9032,29.3132]);
map.addLayer(marker);
var items = [{
  
  lat: "40.9963",
  lon: "39.7808"
}];

drawData();

function drawData() {
  var item, o;
  //draw markers for all items
  for (item in items) {
      o = items[item];
      var loc = new L.LatLng(o.lat, o.lon);
      createPolyLine(loc,[40.9032,29.3132]);
  }
}
  
    //create vaporeto marker, speed : 50000 meters/seconds
    var palneMarker = L.GlAnimatedMarker(pathPlane.getLatLngs(), { icon: iconPlane, speed: 100000 });
    //add marker to leaflet map
    
    map.addLayer(palneMarker);

    
  
    
  
}

let pick = document.getElementById('name');
pick.onchange = function(){
  let a = document.getElementById('name').value;
  if(a="TK7434"){
    planefly();
    console.log(a);
  } 
}




// fetch('http://51.38.90.176:3000/demo1?f15=eq.TK7434&order=f1.asc')
//   .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     // let newJSON = JSON.stringify(myJson);

   
//       // for(let key in myJson){
//       //   for(let i = 0;i<20;i++){
//       //     if(i=3){
//       //       console.log(myJson[i][key]);
//       //     }
          
//       //   }
        
//       // }
      
    
      
    
//   });









