import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-app-home-page',
  templateUrl: './app-home-page.component.html',
  styleUrls: ['./app-home-page.component.css']
})
export class AppHomePageComponent implements OnInit {
  IsPressdProducer:boolean = false;
  IsPressdClients:boolean = false;
  IsPressdCheck:boolean = false;
  IsPressdHistory:boolean = false;
  IsPressedHome:boolean = true;

  constructor(private route:Router,public service:NamesService) { 
    this.service.OnHomePage = true;
  }

  ngOnInit(): void {
  }
  ChangeProducerButtonPressedProperties(){
    this.IsPressdProducer = true;
    this.IsPressdClients = false;
    this.IsPressdCheck = false;
    this.IsPressdHistory = false;
    this.IsPressedHome = false;

  }
  ChangeClientsButtonPressedProperties(){
    this.IsPressdProducer = false;
    this.IsPressdClients = true;
    this.IsPressdCheck = false;
    this.IsPressdHistory = false;
    this.IsPressedHome = false;
  }
  ChangeCheckButtonPressedProperties(){
    this.IsPressdProducer = false;
    this.IsPressdClients = false;
    this.IsPressdCheck = true;
    this.IsPressdHistory = false;
    this.IsPressedHome = false;
  }
  ChangeHistoryButtonPressedProperties(){
    this.IsPressdProducer = false;
    this.IsPressdClients = false;
    this.IsPressdCheck = false;
    this.IsPressdHistory = true;
    this.IsPressedHome = false;
  }
  ChangeHomeButtonPressedProperties(){
    this.IsPressdProducer = false;
    this.IsPressdClients = false;
    this.IsPressdCheck = false;
    this.IsPressdHistory = false;
    this.IsPressedHome = true;
    this.service.OnHomePage = true;
  }
  Logout(){
    this.service.name ="";
    this.service.adminMode = false;
    this.route.navigateByUrl('/');

  }
}
