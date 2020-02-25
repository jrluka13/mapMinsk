let x;
let y;
let arrayOfX = [];
let arrayOfY = [];
let profit = [];
let newX;
let newY;
let arrLat = [];
let arrLon = [];
let flightplane = [];
let flightplane_300 = []; 
let time = [];


let map = L.map('map', {
}).setView([39.334,34.651],6);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

function onMapClick(e) {
    console.log("Coordinates:" + e.latlng);
}

map.on('click', onMapClick);


let canvas = document.querySelector('canvas'),
  context = canvas.getContext('2d');
 
    
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





document.getElementById('removeGreed').addEventListener('click',function(){
 
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.zIndex = '1';
});
document.getElementById('returnGreed').addEventListener('click',function(){
  
  drawGrid();
  canvas.style.zIndex = '4';
})



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




// parse json
let data = null;
$.getJSON("flights.json",function(result){
  data = result;
  for(let i = 0;i<=data.length-1;i++){
    let project = data[i];
    flightplane[i] = [project['lat'],project['lon']];
    time[i] = [project['dati']];
  }
  console.log(time);
  console.log(flightplane);
})

let data1 = null;
$.getJSON("300flights.json",function(result){
  data1 = result;
  for(let i = 0;i<=data1.length-1;i++){
    let project1 = data1[i];
    flightplane_300[i] = [project1['lat'],project1['lon']];
  }
  
})
console.log(flightplane_300);


      
function planefly(){
  var iconPlane = L.icon({
    iconUrl:'/проект/plane.png',
    iconSize: [48, 48],
    
  });
  let pathline = L.polyline(flightplane,{color:'red'});
  pathline.addTo(map);
  // var pathLinePlane = L.polyline(flightplane);
  // var animatedMarker = L.animatedMarker(pathLinePlane.getLatLngs(), {
  //   icon: iconPlane
  // });
    let index=0;
    let current=time[0];
    let id = setInterval(frame,1000);
    function frame(){
        console.log("current :" + current+" time :"+time[index] + " index :" +index);
          if(current == time[index]){ 
            ++index;
              var animationMarker = L.Marker.movingMarker(
                flightplane,
                20000,{autostart: true});
                animationMarker.options.icon = iconPlane;
              map.addLayer(animationMarker);
          }
        
    if(current<time[index])
    current++;
      
      
    }
}

function flights_300Fly(){
    for(let i=0;flightplane_300.length;i++){
      L.marker([flightplane_300[i][0],flightplane_300[i][1]] ,{icon: iconPlane}).addTo(map);
     
    }
}

flights_300Fly();



// var markers = [
//   [ -0.1244324, 51.5006728],
//   [ -0.119623, 51.503308],
//   [ -0.1279688, 51.5077286] 
// ];

// //Loop through the markers array
// for (var i=0; i<flightplane_300.length; i++) {
 
//   var lon = flightplane_300[i][0];
//   var lat = flightplane_300[i][1];
  
  
//    var markerLocation = new L.LatLng(lat, lon);
//    L.Marker(markerLocation,{iconPlane}).addTo(map);
  

// }






let pick = document.getElementById('name');
pick.onchange = function(){
  let a = document.getElementById('name').value;
  if(a="TK7434"){
    planefly();
    console.log(a);
  }
  // else if(a="300flights") {
  //   flights_300Fly();
  //   console.log(a);
  // }
}














