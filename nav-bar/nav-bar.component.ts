import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements AfterViewInit, OnInit {
  IsLoading:boolean
  aircraftName:string[] = [];
  constructor(private _http:HttpClient,service:NamesService) { 
    service.OnHomePage = false;
    const url= "https://localhost:44328/api/decodedIcd";
    this._http.get<any>(url).subscribe(info => {this.aircraftName = info})
    this.IsLoading =  true;
    console.log("contructor");
  }

  ngAfterViewInit(): void {
    this.IsLoading =  false;
  }
  ngOnInit(): void {
    console.log("on init");
  }
}
