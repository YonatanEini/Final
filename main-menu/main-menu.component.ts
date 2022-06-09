import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  todayDate:string;
  currentTime:string;
  constructor(private location:Location, private router:Router, public service:NamesService) { 
    var date =  new Date();
    let month = date.getMonth() +1;
    this.todayDate = date.getDate() + "/" + month + "/" +date.getFullYear();
    this.currentTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    setInterval(this.getCurrentTime, 1000);
  }
  ngOnInit(): void {
  }
  getCurrentTime(){
    var today = new Date();
    var minutes:Number = today.getMinutes();
    var seconds:Number = today.getSeconds();
    var minutesAddition = "";
    var secondsAddition = "";
    if(minutes < 10){
        minutesAddition = "0";
    }
    if(seconds < 10){
       secondsAddition = "0";
    }
    this.currentTime = today.getHours() + ":" + minutesAddition + minutes + ":"+ secondsAddition + seconds;
    var item = document.getElementById("hour");
    if (item) item.innerHTML = this.currentTime;

  }
 NavToHomePage(){
   this.service.OnHomePage = true;
 }

}
