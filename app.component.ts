import { Component, OnInit } from '@angular/core';
import { NamesService } from './names.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-app';
  constructor (private _http:HttpClient,  public service:NamesService){
    this.service.OnHomePage = true;
    
  }

  ngOnInit(){
    this.service.OnHomePage = true;

    //this._http.post<any>('https://localhost:44364/api/DecodedIcd', { AircraftName:"F-15",Type:"Uplink",TransimisionRate:"5000"}).subscribe(data => {
    //  this.title = data.id;
}
}
