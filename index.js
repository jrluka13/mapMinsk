
let arrayOfX = [];
let arrayOfY = [];
let profit = [];
let newX;
let newY;
let planes = [];
let JSONstirngs= null;
let objectParsedJSON = null;
let arrFeatures = [];
let arrRadars = [];
let arrCircles = [];
let sortFlight = [];
let time = [];
let flightName = [];
let StartTime = null;
let EndTime = null;
let ep1;
let ep2;
let arrEp = [];
let LaTLonRadars = [[28.894,38.634],[ 34.146,40.897 ],[39.88,37.805]];

$('#choose-file').inputFileText({
    text: 'Select File'
});

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([35.41, 38.82]),
      zoom: 7,
      minZoom:7,
      maxZoom:7
    })
});

let canvas = document.querySelector('canvas');  


function getValue(){
    let x;
    let y;
    let value_y = document.getElementById("CourY").value;
    let value_x = document.getElementById("CourX").value;
    x=parseInt(value_x);
    y=parseInt(value_y);
    drawGrid(x,y);
}

function drawGrid(x,y){
    let GridW = canvas.scrollWidth;
    let GridH = canvas.scrollHeight;
    let context= canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    for (let x1 = 0.5; x1 <= GridW; x1 += x) {
        context.moveTo(x1, 0);
        context.lineTo(x1, GridH);
    }

    for (let y1 = 0.5; y1 <= GridH; y1 += y) {
        context.moveTo(0, y1);
        context.lineTo(GridW, y1);
    }
    context.strokeStyle = "silver";
    context.lineWidth= 0.8;
    context.stroke();
}

class Plane{
    constructor(Name){
        this.name=Name;
        this.Time=[];
        this.TimeNew = [];
        this.Puth=[];
        this.ExempleFeature=null;
    }
    
} 

// class Radar{
//     constructor(Name){
//         this.name = Name;
//         this.Place = [];
//         this.ExempleRadar = null;
//     }
// }


function drawRadar(latLon){
    var iconRadar = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(latLon,'EPSG:4326',
        'EPSG:3857')),
        name: 'Radar',
        population: 4000,
        rainfall: 500
    });



    iconRadar.setStyle(
        new ol.style.Style({
            image: new ol.style.Icon(({
           
                anchor: [0.5, 250],
            
                anchorXUnits: 'fraction',
            
                anchorYUnits: 'pixels',
            
                opacity: 1,
              
                scale: 0.09,
            
                src: 'flight.png'
          
             }))
        })
    );
    arrRadars.push(iconRadar);
      
        
    let vectorSource = new ol.source.Vector({
        features: arrRadars
      });
    
    let vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });
    
    map.addLayer(vectorLayer); 

    return iconRadar;
}

for(let i =0;i<LaTLonRadars.length;i++){
    drawRadar(LaTLonRadars[i]);
}
//draw Cirle visibility for Radar
function drawCircle(LatLon){
    var Circle = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(LatLon,'EPSG:4326',
            'EPSG:3857')),
        name: 'Visibility',
        population: 4000,
        rainfall: 500
    });

    Circle.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 200,
                stroke: new ol.style.Stroke({color: 'yellow', width: 1})
            })
            }))
    arrCircles.push(Circle);
    let vectorSource = new ol.source.Vector({
        features: arrCircles
    });
    let vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    map.addLayer(vectorLayer);
    return Circle;
}

for(let i =0;i<LaTLonRadars.length;i++){
    drawCircle(LaTLonRadars[i]);
}





// function drawPlane(lat,lon){
//     var iconFeature = new ol.Feature({
//         geometry: new ol.geom.Point(ol.proj.transform([lat,lon],'EPSG:4326',
//         'EPSG:3857')),
//         name: 'Flight',
//         population: 4000,
//         rainfall: 500
//     });
      
//     iconFeature.setStyle(
//         new ol.style.Style({
         
//                image: new ol.style.Icon(({
           
//                anchor: [0.5, 250],
           
//                anchorXUnits: 'fraction',
           
//                anchorYUnits: 'pixels',
           
//                opacity: 1,
             
//                scale: 0.09,
           
//                src: 'plane.png'
         
//             }))
       
//         })
//     );
//     arrFeatures.push(iconFeature);
        
//     var vectorSource = new ol.source.Vector({
//         features: arrFeatures
//       });
    
//       var vectorLayer = new ol.layer.Vector({
//         source: vectorSource
//       });
    
//     map.addLayer(vectorLayer); 
    


//     return iconFeature;
// }

function drawPlaneRed(lat,lon){
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
           
               src: 'planeRed.png'
         
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
          color: 'purple',
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
                   element.ExempleFeature = drawPlaneRed(element.Puth[0][0],element.Puth[0][1]);
                    drawPolyline(element.Puth); 
                } 
            // console.log(" Name: " + element.name+" "+" Position: "+element.Puth + "Time :" + element.Time);
            //                            ind++;
        });
    };
    reader.readAsText(input.files[0]);

}




function Fly(){
    var CurrentTime= StartTime;
    var e = document.getElementById("echo");
    var echo = e.options[e.selectedIndex].value;
    let id = setInterval(frame, echo);
    function frame(){
        planes.forEach(element=>{
            if(element.TimeNew.indexOf(CurrentTime.toString())!=(-1)){
                for(let i=0;i<element.Puth.length;i++){
                    if( "32.585" <= element.Puth[i][0] <= "35.76" && "39.69" <= element.Puth[i][1] <= "42.131"){
                        element.ExempleFeature.getStyle().setImage(
                            new ol.style.Icon(({
           
                                anchor: [0.5, 250],
                                anchorXUnits: 'fraction',
           
                                anchorYUnits: 'pixels',
                            
                                opacity: 1,
                              
                                scale: 0.09,
                            
                                src: 'planeGreen.png'
                          
                             }))
                        );
                        var point1 = new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())], 'EPSG:4326','EPSG:3857'));
                        var point2 = new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())+1], 'EPSG:4326','EPSG:3857'));
                        var x = point2.getCoordinates()[0]-point1.getCoordinates()[0];
                        var y = point2.getCoordinates()[1]-point1.getCoordinates()[1];
                        var angle = Math.atan2(x,y) - 89.5;
                        element.ExempleFeature.getStyle().getImage().setRotation(angle);
                        element.ExempleFeature.setGeometry(new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())], 'EPSG:4326','EPSG:3857')));
                        // console.log(element.TimeNew.indexOf(CurrentTime.toString())+"  current time: " + CurrentTime +"  End time: "+ EndTime);
                    }else if ("32.585" >= element.Puth[i][0] >= "35.76" && "39.69" >= element.Puth[i][1] >= "42.131"){
                        element.ExempleFeature.getStyle().setImage(
                            new ol.style.Icon(({
           
                                anchor: [0.5, 250],
                                anchorXUnits: 'fraction',
           
                                anchorYUnits: 'pixels',
                            
                                opacity: 1,
                              
                                scale: 0.09,
                            
                                src: 'planeRed.png'
                          
                             }))
                        );
                        var point1 = new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())], 'EPSG:4326','EPSG:3857'));
                        var point2 = new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())+1], 'EPSG:4326','EPSG:3857'));
                        var x = point2.getCoordinates()[0]-point1.getCoordinates()[0];
                        var y = point2.getCoordinates()[1]-point1.getCoordinates()[1];
                        var angle = Math.atan2(x,y) - 89.5;
                        element.ExempleFeature.getStyle().getImage().setRotation(angle);
                        
                        element.ExempleFeature.setGeometry(new ol.geom.Point(ol.proj.transform(element.Puth[element.TimeNew.indexOf(CurrentTime.toString())], 'EPSG:4326','EPSG:3857')));
                        
                        console.log(element.TimeNew.indexOf(CurrentTime.toString())+"  current time: " + CurrentTime +"  End time: "+ EndTime);
                    }
                }
                    
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
    //     console.log(planes[i].Puth);
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




  