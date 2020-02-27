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
let flightName = [];
let time = [];
let sortFlight = [];
let arrObject = [];
let arrObjectCor = [];

let map = L.map('map', {
}).setView([39.334,34.651],4);

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
  // console.log("time:");
  // console.log(time);
  // console.log("puth polyline: ");
  // console.log(flightplane);
//create pathline for plane
  // var myLines = {
  //   "type": "LineString",
  //   "coordinates": flightplane
  // };
  
  // var myStyle = {
  //   "color": "#ff7800",
  //   "weight": 5,
  //   "opacity": 0.65
  // };
  
  // L.geoJSON(myLines, {
  //   style: myStyle
  // }).addTo(map);

})

//sorted of uniq
function sort(arr) {
    arr.sort((a, b) => a.f18 > b.f18 ? 1 : -1);
}

// parse json
let data1 = null;
$.getJSON("300flights.json",function(result){
  data1 = result;
  
//massiv unique plane
let used = {};

    let filtered = data1.filter(function (obj) {
        return obj.f15 in used ? 0: (used[obj.f15]=1);

    });
    // console.log("Sorted array of unique");
    // console.log(filtered);
    
    for(let i = 0;i<=filtered.length-1;i++){
      
      let project4 = filtered[i];
      flightplane_300[i] = [project4['lon'],project4['lat']];
      
    }
console.log(flightplane_300);

  // create a lot of points of planes on the map
  for (var i=0; i<flightplane_300.length; i++) {
 
    var lon = flightplane_300[i][0];
    var lat = flightplane_300[i][1];
    
    
     var markerLocation = new L.LatLng(lat, lon);
     L.marker(markerLocation,{icon:iconPlane}).addTo(map);
  }

})
$.getJSON('300flights.json', function(result) {
  data = result;
  for (let i = 0; i <= data.length - 1; i++) {
      if (data[i]['f15'] != '') {
          sortFlight.push(data[i]);
      }
  }
 
  sort(sortFlight);
  //Arr Of objects
  createArrayOfObjects();
  
  for(let i =0;i<sortFlight.length;i++){
    if(flightName.indexOf(sortFlight[i]['f15'])==(-1) ){
      flightName.push(sortFlight[i]['f15']);
      arrObject[i].position.push([sortFlight[i]['lat'],sortFlight[i]['lon']]);
      arrObject[i].time.push(sortFlight[i]['dati']);
    }
    else{
      arrObject[flightName.indexOf(sortFlight[i]['f15'])].position.push([sortFlight[i]['lat'], sortFlight[i]['lon']]);
            arrObject[flightName.indexOf(sortFlight[i]['f15'])].time.push(sortFlight[i]['dati']);
    }
  }

  for(let i =0;i<flightName.length;i++){
    arrObject[i].name = flightName[i];
  }
  for(let i =0;i<arrObject.length;i++){
    if(arrObject[i].name != ""){
      arrObjectCor[i] = arrObject[i];
    } 
  }
  console.log(arrObjectCor);

for(let i =0;i<arrObjectCor.length;i++){
  L.polyline(arrObjectCor[i].position,{color:'red'}).addTo(map);
}


// for(let i=0;i<arrObjectCor.length;i++){
//   let project4 = arrObjectCor[i].position[0];
//   L.marker(project4,{icon:iconPlane}).addTo(map);
//   console.log(project4);
// }


});
function createArrayOfObjects(){
  for(let i = 0;i<data.length;i++){
    arrObject[i]={name: '',position:[],time:[]};
  }
}







var iconPlane = L.icon({
  iconUrl:'/проект/plane.png',
  iconSize: [48, 48],
}); 
// L.marker([40.9032,29.3132],{icon: iconPlane}).addTo(map);   



//animate plane
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














