import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'chart.js';
import { AzalazedObject, NamesService } from '../names.service';

Chart.register(...registerables);

@Component({
  selector: 'app-graphs-component',
  templateUrl: './graphs-component.component.html',
  styleUrls: ['./graphs-component.component.css']
})
export class GraphsComponentComponent implements OnInit {
  myChart!: Chart; 
  speedHourChart!:Chart;
  heightSpeed:number = 0;
  heightHeight:number = 0;
  totalFrames:number = 0;
  avgHeight:number = 0;
  avgWindSpeed:number = 0;
  constructor(private _http:HttpClient, private servics:NamesService) { 
    servics.OnHomePage = false;
    servics.onGraphs = true;
  }

  ngOnInit(): void {
    this.createGraphs()
    setInterval(() =>{  this.getPandasData() }, 1000);
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
          scales: {
            x:{
              title:{
                text: 'Hour',
              display: true,
              color: 'black'
              }
            },
              y: {
                  beginAtZero: true,
                  title:{
                    text: 'Height',
                    display: true,
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
          pointBorderColor: 'rgba(6, 3, 56, 0.63)',
          pointBackgroundColor: 'rgba(6, 3, 56, 0.63)',
          pointHoverBorderColor: 'black',
          pointHoverBackgroundColor: 'black',
            label: 'speed by time',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointRadius: 1,

            data:[],
            borderColor: 'rgba(6, 3, 56, 0.63)',
            backgroundColor:'rgba(6, 3, 56, 0.63)',
        }]
    },
    options: {
      responsive: true,
      plugins: {
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
          display: true,
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
          display: true,
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
  }

  
  getPandasData()
  {
    const url = 'http://127.0.0.1:5000/pandasController'
    this._http.get<string>(url).subscribe(info => {
    let jsonObj: any = JSON.parse(info); // string to generic object first
    let statsObject: AzalazedObject = <AzalazedObject>jsonObj;
    console.log(info)
    if(statsObject != undefined){
      var data = this.myChart.data;
      var speedHourData = this.speedHourChart.data;
      data.labels?.push(statsObject.time);
      data.datasets[0].data.push(statsObject.current_height);
      speedHourData.labels?.push(statsObject.time);
      speedHourData.datasets[0].data.push(statsObject.current_wind_speed)
     // this.heightHeight = statsObject.max_height;
    //  this.heightSpeed = statsObject.max_speed;
     // this.totalFrames = statsObject.frame_count;
    //  this.avgHeight = +(Math.round(statsObject.avg_height * 100) / 100).toFixed(2);
    //  this.avgWindSpeed = +(Math.round(statsObject.avg_wind_speed * 100) / 100).toFixed(2);
      this.myChart.update();
      this.speedHourChart.update();
    }
    }, (error) => {
        
    })  
  }
  
}
