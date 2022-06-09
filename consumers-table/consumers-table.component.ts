import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MongoClient, NamesService, SplunkClient, UdpClient } from '../names.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consumers-table',
  templateUrl: './consumers-table.component.html',
  styleUrls: ['./consumers-table.component.css']
})
export class ConsumersTableComponent implements OnInit {
  MongoClients:MongoClient[];
  UdpClients:UdpClient[];
  HttpClients:UdpClient[];
  TcpClients:UdpClient[];
  WebSocketClient:UdpClient[];
  SplunkClient:SplunkClient[];
  CancelledRequests: string[];
  constructor(public service:NamesService, private _http:HttpClient) { 
    this.MongoClients = this.service.MongoDBclientList;
    this.UdpClients = this.service.UdpClientList;
    this.HttpClients = this.service.HttpClientList;
    this.TcpClients = this.service.TcpClientList;
    this.WebSocketClient= this.service.WebSocketClietList;
    this.SplunkClient = this.service.SplunkClientList;
    this.CancelledRequests = [];
    this.CheckCancelledRequests()
  }
  ngOnInit(): void {
  }
  showcards(){
     this.service.showcards = true;
  }
  cancelMongoConsumer(client:MongoClient){
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelMongoClient', { Port: client.port,
    Ip: client.Ip,
    DataBaseName:client.DataBaseName,
    CollectionName:client.CollectionName,
    ConsumerTopic: client.ConsumerTopic}).subscribe(response=>
    {
      Swal.fire({
        icon: 'success',
        title: "MongoDB Client Has Been Canceled",
        timer: 5000,
      }).then(() => {
        Swal.close;
        this.deleteRowMongo(client);
      });
    })
  }
  cancelUdpConsumer(client:UdpClient){
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelUdpClient', { Port: client.port,
    Ip: client.Ip,
    ConsumerTopic: client.ConsumerTopic}).subscribe(response=>
    {
      Swal.fire({
        icon: 'success',
        title: "Udp Client Has Been Canceled",
        timer: 5000,
      }).then(() => {
        Swal.close;
        this.deleteRowUdp(client);
    });

    })
  }
  cancelHttpConsumer(client:UdpClient){
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelHttpClient', { Port: client.port,
    Ip: client.Ip,
    ConsumerTopic: client.ConsumerTopic}).subscribe(response=>
    {
      Swal.fire({
        icon: 'success',
        title: "Http Client Has Been Canceled",
        timer: 5000,
      }).then(() => {
        Swal.close;
        this.deleteRowHttp(client);
    });      
    })
  }
  deleteRowMongo(d:any){
    const index = this.MongoClients.indexOf(d);
    this.MongoClients.splice(index, 1);
}
deleteRowUdp(d:any){
  const index = this.UdpClients.indexOf(d);
  this.UdpClients.splice(index, 1);
}
deleteRowHttp(d:any){
  const index = this.HttpClients.indexOf(d);
  this.HttpClients.splice(index, 1);
}
CheckCancelledRequests(){
  this._http.get<any>("https://localhost:44328/api/decodedIcd/CancelledRequests").subscribe(info => {
    this.CancelledRequests =  info
    for (let i=0; i<this.CancelledRequests.length;i++)
    {
      this.CancelledRequests[i] =  this.CancelledRequests[i].split(',').join("\r\n");
      let CancelledRequestWithoutSpaces:string[]  = this.CancelledRequests[i].split("\r\n");
      let ip = CancelledRequestWithoutSpaces[1].split(":")[1]; //exports ip
      let port = CancelledRequestWithoutSpaces[2].split(":")[1]; //exports port
      if(ip == "localhost")
          ip = "127.0.0.1";
      let client = this.HttpClients.find(i => i.Ip === ip && i.port === +port); //searching the client with the properties
      this.deleteRowHttp(client); //deleting the client
    }
  })
}
}
