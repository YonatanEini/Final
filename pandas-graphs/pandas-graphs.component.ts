import { Component, OnInit } from '@angular/core';
import { AzalazedObject, NamesService } from '../names.service';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables} from 'chart.js';



@Component({
  selector: 'app-pandas-graphs',
  templateUrl: './pandas-graphs.component.html',
  styleUrls: ['./pandas-graphs.component.scss']
})
export class PandasGraphsComponent implements OnInit {
  myChart!: Chart; 
  speedHourChart!:Chart;
  LightsChart!:Chart;
  LightPieChart!:Chart;
  heightSpeed:number = 0;
  heightHeight:number = 0;
  totalFrames:number = 0;
  avgHeight:number = 0;
  avgWindSpeed:number = 0;
  decodedRate:string = " ";
  
  seconds:number = 0;
  minutes:number = 0;
  runningTime:string = "00:00";
  IsOnPause:boolean = false;

  item_recived:AzalazedObject[] = [];
  speedCounterList:number[] = [0,0,0,0]

  constructor(private _http:HttpClient, private service:NamesService) { 
    this.service.OnHomePage = false;
    
  }

  ngOnInit(): void {
    this.service.onGraphs = true;
    this.createGraphs()
    setInterval(() =>{  this.getPandasData() }, 500);
   
  }
  clearElementHeight(numberOfElements:number){
    if(this.myChart.data.datasets[0].data.length <= numberOfElements){
      this.myChart.data.datasets[0].data.splice(0,this.speedHourChart.data.datasets[0].data.length)
      this.myChart.data.labels?.splice(0, this.speedHourChart.data.labels?.length)

    }
    else
    {
      this.myChart.data.datasets[0].data.splice(0,numberOfElements)
      this.myChart.data.labels?.splice(0, numberOfElements)
    }
}
  clearElementSpeed(numberOfElements:number){
    if(this.speedHourChart.data.datasets[0].data.length <= numberOfElements){
      this.speedHourChart.data.datasets[0].data.splice(0,this.speedHourChart.data.datasets[0].data.length)
      this.speedHourChart.data.labels?.splice(0, this.speedHourChart.data.labels?.length)

    }
    else
    {
      this.speedHourChart.data.datasets[0].data.splice(0,numberOfElements)
      this.speedHourChart.data.labels?.splice(0, numberOfElements)
    }
}
  ChangeTimeInterval(){
    console.log(this.IsOnPause)
      if (!this.IsOnPause){
      this.seconds++;
      if(this.seconds == 60)
          {
            this.seconds = 0;
            this.minutes++;
          }
      let secondsAddition = ""
      let minutesAddition = ""
      if (this.seconds < 10)
          secondsAddition = '0';
      if (this.minutes < 10)
          minutesAddition = '0';

      this.runningTime = minutesAddition + this.minutes + ':' + secondsAddition + this.seconds
    }
  }
  createGraphs(){
    
    this.myChart = new Chart("myChart", {
      
     type: 'bar',
     data: {
         labels:[],
         datasets: [{
             label: 'height by time',
             data:[],
             borderColor: 'balck',
             backgroundColor: 'black',
             borderWidth: 2,
         }]
     },
     options: {
      plugins: {
        legend: {
          display: false
        }
      },
         scales: {
           x:{
             title:{
               text: 'Hour',
             color: 'black'
             }
           },
             y: {
                 beginAtZero: true,
                 title:{
                   text: 'Height',
                   color: 'black'
                 }                  
             }
         },
         
     }
 });
 this.speedHourChart = new Chart("speed-hour", {
   type: 'line',
   data: {
       labels:[],
       datasets: [{
         fill: 'false',
         borderDash: [],
         borderDashOffset: 0.0,
         borderJoinStyle: 'miter',
          
           label : undefined,
           pointBorderWidth: 1,
           pointHoverRadius: 5,
           pointRadius: 1,

           data:[],
           borderColor: 'rgba(6, 3, 56, 0.63)',
           backgroundColor:'rgba(6, 3, 56, 0.63)',
       }]
   },
   
   options: {
    
     plugins: {
      legend: {
        display: false
      },
      title: {
         display: true,
       },
       tooltip: {
         mode: 'index'
       },
     },
     interaction: {
       mode: 'nearest',
       axis: 'x',
       intersect: false
   },
   scales: {
     
     x: {
       title: {
         text: 'Hour',
         color: 'black'
       },
       ticks: {
         //color: "black", // this here
       },
       
     },
     y: {
       stacked: true,
       title: {
         text: 'Wind Speed',
         color: 'black'
       },
       ticks: {
         //color: "black", // this here
       },
     }
   }
 }

   
});

this.LightsChart = new Chart("Light-hour", {
  type: 'line',
  data: {
      labels:[],
      datasets: [
        {
          type: 'line',
        stepped: 'middle',
        fill: 'false',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
         
          label : "Light - Eng Cut",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointRadius: 1,

          data:[],
          borderColor: 'black',
          backgroundColor:'black',
      },
      {
        type: 'line',
        label : "Light - Ready",
        stepped: 'middle',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointRadius: 1,
          data:[],
          borderColor: '#3ac47d',
          backgroundColor:'#3ac47d',
      }, 
      {
        type: 'line',
        label : "Light - Copilot",
        stepped: 'middle',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointRadius: 1,
          data:[],
          borderColor: '#3f6ad8',
          backgroundColor:'#3f6ad8',
      }
    ],
  },
  
  options: {
    
    layout: {
      padding: 30
  },
    responsive: true,
    

    plugins: {
     legend: {
       display: true,
       
       
     },
     title: {
        display: true,
        
      },
      tooltip: {
        mode: 'index',
        
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
  },
  scales: {
    
    
    x: {
      title: {
        text: 'Hour',
        color: 'black'
      },
      ticks: {
        //color: "black", // this here
      },
      
    },
    y: {
      stacked: true,
      title: {
        text: 'Wind Speed',
        color: 'black'
      },
      ticks: {
        //color: "black", // this here
      },
    }
  }
}

  
});
this.LightPieChart = new Chart("pie-chart", {
  type: 'pie',
  data : {
    labels: ['200-255', '150-199', '100-149', '0-100'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [0,0,0,0],
        backgroundColor: ['#F0EC57','#748067','#4F4789','#808A9F'],
      }
    ]
  },
  
  options: {
    responsive: true,
    plugins: {
     legend: {
       position: 'top',
       display: true
     },
     title: {
        display: true,
      },
    },
}

  
});
 }

 
 getPandasData()
 {
   const url = 'http://127.0.0.1:5000'
   this._http.get<string>(url).subscribe(info => {

   let jsonObj: any = JSON.parse(info); // string to generic object first
   let statsObject: AzalazedObject = <AzalazedObject>jsonObj;

   if(statsObject != undefined && !this.containsObject(statsObject, this.item_recived)){
      
    if(this.item_recived.length == 0){
         this.decodedRate = statsObject.time
      }
      this.item_recived.push(statsObject)

      var data = this.myChart.data;
      var speedHourData = this.speedHourChart.data;
      var lightChartData = this.LightsChart.data;
      var pieChartData = this.LightPieChart.data

      this.IsOnPause = false;


      data.labels?.push(statsObject.time);
      data.datasets[0].data.push(statsObject.current_height);

      speedHourData.labels?.push(statsObject.time);
      speedHourData.datasets[0].data.push(statsObject.current_wind_speed)

      lightChartData.labels?.push(statsObject.time);
      lightChartData.datasets[0].data.push(statsObject.light_eng)
      lightChartData.datasets[1].data.push(statsObject.light_ready)
      lightChartData.datasets[2].data.push(statsObject.light_Copilot)

      this.getSpeedProperty(statsObject.current_velocity)
      pieChartData.datasets[0].data = this.speedCounterList;


      this.heightHeight = Math.max(this.heightHeight, statsObject.current_height)
      this.heightSpeed = Math.max(this.heightSpeed, statsObject.current_velocity)
      let updatedHeightAvg = (this.avgHeight * this.totalFrames + statsObject.current_height) / (this.totalFrames + 1)
      this.avgHeight = +(Math.round(updatedHeightAvg * 100) /100 ).toFixed(2);
      let updatedWindSpeedAvg = (this.avgWindSpeed * this.totalFrames + statsObject.current_wind_speed) / (this.totalFrames + 1)
      this.avgWindSpeed = +(Math.round(updatedWindSpeedAvg * 100) /100 ).toFixed(2);
    
      
      if (this.totalFrames == 0){
        setInterval(() =>{  this.ChangeTimeInterval() }, 1000);
      }

      this.totalFrames++;
      this.myChart.update();
      this.speedHourChart.update();
      this.LightsChart.update();
      this.LightPieChart.update();
   }
   else
   {
     this.IsOnPause = true;
   }
   }, (error) => {
        this.IsOnPause = true;
  })  
 }
 containsObject(obj:AzalazedObject, list:AzalazedObject[]) {
  var i;
  if(obj.time == "0")
      return true
  for (i = 0; i < list.length; i++) {
      if  (list[i].time === obj.time && list[i].current_height == obj.current_height && list[i].current_velocity == obj.current_velocity) {
          return true;
      }
  }
  return false;
}
getSpeedProperty(value:Number){
  if(value >= 200 && value < 255){
      this.speedCounterList[0]++
      return;
  }
  if (value >= 150 && value < 200){
      this.speedCounterList[1]++
      return;
  }
  if (value >= 100 && value < 150){
      this.speedCounterList[2]++
      return;
  }
  this.speedCounterList[3]++
}

}
