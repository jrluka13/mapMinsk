
let arrayOfX = [];
let arrayOfY = [];
let profit = [];
let newX;
let newY;
let planes = [];
let JSONstirngs= null;
let objectParsedJSON = null;
let arrFeatures = [];
let sortFlight = [];
let time = [];
let flightName = [];
let StartTime = null;
let EndTime = null;
let ep1;
let ep2;
let arrEp = [];
//////

// let flightplane = [];
// let flightplane_300 = []; 

// let arrObject = [];
// let arrObjectCor = [];



var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      new ol.layer.Graticule({
          strokeStyle: new ol.style.Stroke({
              color: 'green',
              width: 2,
              lineDash: [0.5,4]
          }),
          showLabels: true,
          wrapX: false
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([35.41, 38.82]),
      zoom: 6
    })
});

let canvas = document.querySelector('canvas');
// context = canvas.getContext('2d');
var vectorContext = ol.render.toContext(canvas.getContext('2d'), {size: [150,150]});

this.Graticule = new ol.layer.Graticule({
    numPoints: 2,
    labelled: true,
    lineSymbolizer:{strokeColor: "#ffffff", strokeWidth: 1, strokeOpacity: 0.2},
    labelSymbolizer: {
        fontColor: "#ffffff",
        fontSize: "12px"
    }
});

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

class Plane{
    constructor(Name){
        this.name=Name;
        this.Time=[];
        this.TimeNew = [];
        this.Puth=[];
        this.ExempleFeature=null;
    }
    
    
} 

function drawPlane(lat,lon){
    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lat,lon],'EPSG:4326',
        'EPSG:3857')),
        name: 'Flight',
        population: 4000,
        rainfall: 500
    });
      
    iconFeature.setStyle(
        new ol.style.Style({
         
               image: new ol.style.Icon(({
           
               anchor: [0.5, 250],
           
               anchorXUnits: 'fraction',
           
               anchorYUnits: 'pixels',
           
               opacity: 1,
             
               scale: 0.09,
           
               src: 'plane.png'
         
            }))
       
        })
    );
    arrFeatures.push(iconFeature);
        
    var vectorSource = new ol.source.Vector({
        features: arrFeatures
      });
    
      var vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });
    
    map.addLayer(vectorLayer); 
    


    return iconFeature;
}



function drawPolyline(lat,lon){
    var line = new ol.geom.LineString(lat,lon);
    line.transform('EPSG:4326','EPSG:3857');
    var feature = new ol.Feature(line);
    var sourceVector = new ol.source.Vector();
    sourceVector.addFeature(feature);
    var red = new ol.style.Style({
        
        stroke: new ol.style.Stroke({
          color: 'red',
          width: 3,
        })
      
          });
    var layer = new ol.layer.Vector({
        source: sourceVector,
        style:red
    });
    map.addLayer(layer);

}


var parse = function(event){
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        JSONstirngs = text;
        objectParsedJSON= JSON.parse(JSONstirngs);
        Sort(objectParsedJSON);
        changeTime();

        // let ind=0;
            planes.forEach(element=>{
                if(element.TimeNew.length != 0){
                    element.ExempleFeature = drawPlane(element.Puth[0][0],element.Puth[0][1]);
                    drawPolyline(element.Puth);
                }
                
            // console.log(" Name: " + element.name+" "+" Position: "+element.Puth + "Time :" + element.Time);
            //                            ind++;
        });
    };
    reader.readAsText(input.files[0]);

}


// var degrees = 360-(angle*180/Math.PI)-90;

function Fly(){
    var CurrentTime= StartTime;
    var e = document.getElementById("echo");
    var echo = e.options[e.selectedIndex].value;
    let id = setInterval(frame, echo);
    function frame(){
        planes.forEach(element=>{
            if(element.TimeNew.indexOf(CurrentTime.toString())!=(-1)){
                var point1 = new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())], 'EPSG:4326','EPSG:3857'));
                var point2 = new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())], 'EPSG:4326','EPSG:3857'));
                var x = point2.getCoordinates()[0]-point1.getCoordinates()[0];
                var y = point2.getCoordinates()[1]-point1.getCoordinates()[1];
                var angle = Math.atan2(x,y) - 89.5;
                
                element.ExempleFeature.getStyle().getImage().setRotation(angle);
                element.ExempleFeature.setGeometry(new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())], 'EPSG:4326','EPSG:3857')));
                
                console.log(element.TimeNew.indexOf(CurrentTime.toString())+"  current time: " + CurrentTime +"  End time: "+ EndTime);    
            }
        });
                CurrentTime++;
            if (CurrentTime == EndTime)clearInterval(id);
    }
}


function Sort(arrayOfJSON){
    StartTime=arrayOfJSON[0].dati;
    EndTime = arrayOfJSON[arrayOfJSON.length-1].dati;
    for(let i=0; i<arrayOfJSON.length;i++){
        //   sortFlight[i]= [arrayOfJSON[i].lon,arrayOfJSON[i].lat];
        //   time[i] = [arrayOfJSON[i].f1];
        // if(arrayOfJSON[i].dati >= arrEp[0] && arrayOfJSON[i].dati <= arrEp[1])
        // {
            if(flightName.indexOf(arrayOfJSON[i].f15)==(-1) && arrayOfJSON[i].f15!="")
            {

                flightName.push(arrayOfJSON[i].f15);
                planes.push(new Plane(arrayOfJSON[i].f15));
            planes[planes.length-1].Puth.push([arrayOfJSON[i].lon,arrayOfJSON[i].lat]);
            // if(i%2==0){
            //     planes[planes.length-1].Time.push(arrEp[0]);
            // }else{
            //     planes[planes.length-1].Time.push(arrEp[1]);
            // }
            planes[planes.length-1].Time.push(arrayOfJSON[i].dati);
            }
            else 
            {
                if(arrayOfJSON[i].f15!=""){
                    planes[flightName.indexOf(arrayOfJSON[i].f15)].Puth.push([arrayOfJSON[i].lon,arrayOfJSON[i].lat]); 
                    planes[flightName.indexOf(arrayOfJSON[i].f15)].Time.push(arrayOfJSON[i].dati);
                    // if(i%2==0){
                    //     planes[flightName.indexOf(arrayOfJSON[i].f15)].Time.push(arrEp[0]);
                    // }else{
                    //     planes[flightName.indexOf(arrayOfJSON[i].f15)].Time.push(arrEp[1]);
                    // }  
                } 
            }
        // }
    
    }
    

    // console.log("array of time");
    // for(let i =0;i<planes.length;i++){
    //     console.log(planes[i].Time);
    // }
    
    // console.log(sortFlight);
    // console.log(time);
};

function changeTime(){
    for(let i=0; i<planes.length;i++){
        if(planes[i].Time[0]>=arrEp[0]&&planes[i].Time[planes[i].Time.length-1]<=arrEp[1]){
            for(let k = 0;k<planes[i].Time.length;k++){
                planes[i].TimeNew.push(planes[i].Time[k]);
            }
            
        }
    }
    // console.log("array of TimeNew");
    // for(let i =0;i<planes.length;i++){
    //     console.log(planes[i].TimeNew);
    // }
}

function setEpoch(){
    ep1= parseInt(document.getElementById('epoch1').value);
    ep2=parseInt(document.getElementById('epoch2').value);

    arrEp.push(ep1,ep2);
    console.log(arrEp);
}




  