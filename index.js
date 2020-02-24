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
let time = [];


let map = L.map('map', {
}).setView([38.908,35.420],6);

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

var iconPlane = L.icon({
  iconUrl:'/проект/plane.png',
  iconSize: [48, 48],
  
});


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

function planefly(){
  let pathline = L.polyline(flightplane,{color:'red'});
  pathline.addTo(map);
  var pathLinePlane = L.polyline(flightplane);
  
    //create vaporeto marker, speed : 50000 meters/seconds
    // var palneMarker = L.GlAnimatedMarker(pathPlane.getLatLngs(), { icon: iconPlane, speed: 100000 });
    // //add marker to leaflet map
    // map.addLayer(palneMarker);

    let index=0;
    let current=time[0];
    let Trigger=true;
    let id = setInterval(frame, 1000)
    function frame(){
      console.log("current :" + current+" time :"+time[index] + " index :" +index)
      if(current == time[index]){ 
            ++index;
      var animatedMarker = L.animatedMarker(pathLinePlane.getLatLngs(), {
      icon: iconPlane
    });
    map.addLayer(animatedMarker);
  }if(current<time[index])
  current++;
    }
}





let pick = document.getElementById('name');
pick.onchange = function(){
  let a = document.getElementById('name').value;
  if(a="TK7434"){
    planefly();
    console.log(a);
  } 
}














