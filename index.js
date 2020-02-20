let x;
let y;
let arrayOfX = [];
let arrayOfY = [];
let profit = [];
let newX;
let newY;


let map = L.map('map', {
}).setView([53.8991, 27.5661], 13);

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





function planeMooving(planeId, xx1, xx2, yy1, yy2, angle, speed) {
  let element = document.getElementById(planeId)
  element.style.transform = 'rotate(-' + angle + 'deg)'
  let x1 = xx1
  let x2 = xx2
  let y1 = yy1
  let y2 = yy2
  let x = x1
  let y = y1
  element.style.left = x1 + 'px'
  element.style.bottom = y1 + 'px'
  let id = setInterval(frame, speed)
  let bool = true

  function frame() {
    if (x == x2 && y == y2) {
      let xp = x1
      let yp = y1
      x1 = x2
      y1 = y2
      y2 = yp
      x2 = xp
      bool
        ? (element.style.transform = 'rotate(' + (180 - angle) + 'deg)')
        : (element.style.transform = 'rotate(-' + angle + 'deg)')
      bool = !bool
    } else {
      if (x2 > x1) {
        x++
        element.style.left = x + 'px'
      } else {
        x--
        element.style.left = x + 'px'
      }
      if (y2 > y1) {
        y = ((x - x1) * (y2 - y1)) / (x2 - x1) + y1
        element.style.bottom = y + 'px'
      } else {
        y = ((x - x2) * (y1 - y2)) / (x1 - x2) + y2
        element.style.bottom = y + 'px'
      }
    }
  }
}

// planeMooving("plane",10,500,500,150,0,5);
function go(){
  planeMooving("plane",10,500,500,150,300,5);
  planeMooving("plane2",1000,500,500,150,180,5);
}
// setTimeout(planeMooving("plane",10,500,500,150,0,5),2000);





// let selectedFile  = document.getElementById('input').files[0];
// Papa.parse(selectedFile,{
//   complete: function(result){
//     console.log(result.data);
//   }
// });

// var fs = require('fs');
// var Papa = require('papaparse');
// var file = '/проект/01052019.csv.bz2';
// // When the file is a local file when need to convert to a file Obj.
// //  This step may not be necissary when uploading via UI
// var content = fs.readFileSync(file, "utf8");

// var rows;
// Papa.parse(content, {
//     header: false,
//     delimiter: "\t",
//     complete: function(results) {
//         console.log("Finished:", results.data);
//     rows = results.data;
//     }
// });













