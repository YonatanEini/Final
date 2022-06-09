import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AzalazedObject, MongoClient, NamesService, UdpClient } from '../names.service';
import { deccodedProperties } from '../user.modeul';


@Component({
  selector: 'app-active-request',
  templateUrl: './active-request.component.html',
  styleUrls: ['./active-request.component.css']
})

export class ActiveRequestComponent implements OnInit {
  UdpClien:UdpClient;
  MongoclientProps:MongoClient;
  HttpClientProps:UdpClient;
  requestsList:deccodedProperties[] = [];
  showMongo:boolean = true;
  showUdp:boolean = true;
  showHttp:boolean = true;
  constructor(private _http:HttpClient, public service:NamesService) { 
    this.getPandasData()
    service.OnHomePage = false;
    this.UdpClien = new UdpClient(-1, "", []);
    this.MongoclientProps = new MongoClient(-1, "", [], "", "");
    this.HttpClientProps = new UdpClient(-1, "", []);
  }
  ngOnInit(): void {
  }
  portNumberChange(event:any){
    this.MongoclientProps.port = event.traget.value
   }
   UdpPortNumberChange(event:any)
   {
    this.UdpClien.port = event.traget.value;
   }
   HttpPortNumberChange(event:any)
   {
    this.HttpClientProps.port = event.traget.value;
   }
   IPAdressChange(event:any){
    this.MongoclientProps.Ip = event.traget.value;
   }
   UdpIPAdressChange(event:any){
      this.UdpClien.Ip = event.target.value;
    }
    HttpIPAdressChange(event:any){
      this.HttpClientProps.Ip = event.target.value;
    }
   DataBaseNameChange(event:any){
     this.MongoclientProps.DataBaseName = event.traget.value;
   }
   CollectionNameChange(event:any){
     this.MongoclientProps.CollectionName = event.traget.value;
   }

   startMongoClient(){
     if(this.MongoclientProps.Ip != ""  && this.MongoclientProps.port != -1 && this.MongoclientProps.ConsumerTopic.length > 0 && this.MongoclientProps.CollectionName != "" && this.MongoclientProps.DataBaseName != "") 
     {
      this._http.post<any>('https://localhost:44328/api/decodedIcd/MongoClientRequest', {Port: this.MongoclientProps.port,
      Ip: this.MongoclientProps.Ip,
      DataBaseName: this.MongoclientProps.DataBaseName,
      CollectionName:this.MongoclientProps.CollectionName,
      ConsumerTopic: this.MongoclientProps.ConsumerTopic}).subscribe(response=>
      {
        this.service.AddMongoClient(this.MongoclientProps);
        this.MongoclientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.MongoclientProps.ConsumerTopic);
        this.MongoclientProps = new MongoClient(-1, "", [], "", "");
        alert("MongoDB client has started")
        this.showMongo = true;
      }, (error) => {                              //Error callback
        alert("error while creating MongoDB client -  invalid mongodb parameters")
      })
    }
    else{
      alert("Fill out missing porperties")
      this.MongoclientProps = new MongoClient(-1, "", [], "", "");
    }
   }
   startUdpClient(){
    if(this.UdpClien.Ip != ""  && this.UdpClien.port != -1 && this.UdpClien.ConsumerTopic.length  > 0 ) 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/UdpClientRequest', {Port: this.UdpClien.port,
     Ip: this.UdpClien.Ip,
     ConsumerTopic: this.UdpClien.ConsumerTopic}).subscribe(response=>
     {
       this.service.AddUdpClient(this.UdpClien);
       this.UdpClien.CommunicationTypeAfterConvert = this.convertFromEnum(this.UdpClien.ConsumerTopic);
       this.UdpClien = new UdpClient(-1, "", []);
      alert("UDP client has started")
      this.showUdp = true;
     },
     (error) => {                              //Error callback
      alert("error while creating udp client - invalid udp parameters")
      this.UdpClien = new UdpClient(-1, "", []); 
    })
   }
   else{
     alert("Fill out missing porperties")
    }
  }
  startHttpClient()
  {
    if(this.HttpClientProps.Ip != ""  && this.HttpClientProps.port != -1 && this.HttpClientProps.ConsumerTopic.length  > 0 ) 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/HttpClientRequest', {Port: this.HttpClientProps.port,
     Ip: this.HttpClientProps.Ip,
     ConsumerTopic: this.HttpClientProps.ConsumerTopic}).subscribe(response=>
     {
       this.service.AddHttpClient(this.HttpClientProps);
       this.HttpClientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.HttpClientProps.ConsumerTopic);
       this.HttpClientProps = new UdpClient(-1, "", []);
      alert("HTTP client has started")
      this.showHttp = true;
     },
     (error) => {                              //Error callback
      alert("error while creating Http client")
      this.HttpClientProps = new UdpClient(-1, "", []); 
    })
   }
   else{
     alert("Fill out missing porperties")
    }
  }
   MongoCommunicationTypeCheckBox(event:any) {
    if ( event.target.checked ) {
      this.MongoclientProps.ConsumerTopic.push(+event.target.value);
   }
   else
   {
    delete this.MongoclientProps.ConsumerTopic[+event.target.value];
   }
}
UdpCommunicationTypeCheckBox(event:any) {
    if ( event.target.checked ) {
      this.UdpClien.ConsumerTopic.push(+event.target.value);
    }
    else
    {
        delete this.UdpClien.ConsumerTopic[+event.target.value];
    }
}
HttpCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.HttpClientProps.ConsumerTopic.push(+event.target.value);
  }
  else
  {
      delete this.HttpClientProps.ConsumerTopic[+event.target.value];
  }
}
clientPropertiesBtnClick(){
  this.service.showcards = false;
}
convertFromEnum(EnumString:number[]):string[]
{
  var communicationTypesAfterConvert:string[] = [];
  var communicationTypes:string[] = ["FlightBoxUp", "FlightBoxDown", "FiberBoxUp", "FiberBoxDown", "LandingBox" ];
  EnumString.forEach(element  => { 
    communicationTypesAfterConvert.push(communicationTypes[+element]);
  });
  return communicationTypesAfterConvert;
}
hideMongo(){
  this.showMongo = false;
}
hideUdp(){
  this.showUdp = false;
}
hideHttp(){
  this.showHttp = false;
}
ExitMongoDataHolder(){
  this.showMongo = true;
}
ExitUdpDataHolder(){
  this.showUdp = true;
}
ExitHttpDataHolder(){
  this.showHttp = true;
}
getPandasData()
  {
    const url = 'http://127.0.0.1:5000/pandasController'
    this._http.get<string>(url).subscribe(info => {
      let jsonObj: any = JSON.parse(info); // string to generic object first
      let statsObject: AzalazedObject = <AzalazedObject>jsonObj;
      //console.log(statsObject.time_data)
    })   
  }
}
