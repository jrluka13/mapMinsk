// function drawGrid() {
//     arrayOfX = [];
//     arrayOfY = [];
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     newX = parseInt(document.updeteGrid.newX.value);
//     newY = parseInt(document.updeteGrid.newY.value);
//     context.beginPath();

//     for ( x = 0; x <= canvas.width; x += newX) {
//       context.moveTo(x, 0);
//       context.lineTo(x, canvas.height);
//     }

//     for ( y = 0; y <= canvas.height; y += newY) {
//       context.moveTo(0, y);
//       context.lineTo(canvas.width, y);
//     }

//     context.stroke();

//     for ( x = 0; x <= canvas.width; x += newX) {
//       arrayOfX.push(Math.floor(x));
//     }

//     for ( y = 0; y <= canvas.height; y += newY) {
//       arrayOfY.push(Math.floor(y));
//     }

// }

// document.getElementById('removeGreed').addEventListener('click',function(){

//     context.clearRect(0, 0, canvas.width, canvas.height);
//     canvas.style.zIndex = '1';

// });
// document.getElementById('returnGreed').addEventListener('click',function(){

//     drawGrid();
//     canvas.style.zIndex = '4';
// })

// canvas.onmousedown = function (event) {
//     x = event.offsetX;
//     y = event.offsetY;
// };

// canvas.onmouseup = function (event) {

// for (let i = 0; i < arrayOfX.length; i++) {
//       if (x <= arrayOfX[i + 1] && x >= arrayOfX[i]) {
//         profit.push(arrayOfX[i]);
//       }
// }
// for (let i = 0; i < arrayOfY.length; i++) {
//     if (y <= arrayOfY[i + 1] && y >= arrayOfY[i]) {
//         profit.push(arrayOfY[i]);
//     }
// }
// context.rect(profit[0] + 0.5, profit[1], newX, newY);
// context.fillStyle = "red";
// context.fill();
// profit = [];

// };