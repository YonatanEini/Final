import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NamesService } from '../names.service';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private location:Location ,private route:Router,public service:NamesService) {   
}

  ngOnInit(): void {
  }
  Logout(){
    this.service.name ="";
    this.service.adminMode = false;
    this.route.navigateByUrl('/');
  } 
}
