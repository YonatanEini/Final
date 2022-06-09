import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MongoClient, NamesService, SplunkClient, UdpClient } from '../names.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-clients-dashboard',
  templateUrl: './clients-dashboard.component.html',
  styleUrls: ['./clients-dashboard.component.css']
})
export class ClientsDashboardComponent implements OnInit {
  
  constructor(public service:NamesService, private _http:HttpClient) { 
    this.service.OnHomePage = false;
    this.service.ShowDashboard = true;

  }

  ngOnInit(): void {
    this.scrollTopPage()
  }
  CancelMongo(client:MongoClient ){
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelMongoClient', client).subscribe(response=>{
     Swal.fire({
        icon: 'success',
        title: "Mongodb Client Cancelled",
       timer: 5000,
       heightAuto: false,
  
      }).then(() =>{
        const index = this.service.MongoDBclientList.indexOf(client, 0);
        if (index > -1) {
          this.service.MongoDBclientList.splice(index, 1);
        }
      })
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: "Unable To Cancel The Client!",
        heightAuto: false,
     }).then(()=>{
      Swal.close();
     })
  })
  }
  scrollTopPage(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
  });
  }
  CancelUdp(client:UdpClient ){
    
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelUdpClient', client).subscribe(response=>{
     Swal.fire({
        icon: 'success',
        title: "Udp Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.UdpClientList.indexOf(client, 0);
        if (index > -1) {
          this.service.UdpClientList.splice(index, 1);
        }
      })
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: "Unable To Cancel The Client!",
        heightAuto: false,
     }).then(()=>{
      Swal.close();
     })
  })
  }
  CancelHttp(client:UdpClient ){
    if(this.CheckIfClientExistAndCancel(client, this.service.HttpClientList)){
      Swal.fire({
        icon: 'success',
        title: "Http Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.HttpClientList.indexOf(client, 0);
        if (index > -1) {
          this.service.HttpClientList.splice(index, 1);
        }
      })
    }
    else{
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelHttpClient', client).subscribe(response=>{
     Swal.fire({
        icon: 'success',
        title: "Http Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.HttpClientList.indexOf(client, 0);
        if (index > -1) {
          this.service.HttpClientList.splice(index, 1);
        }
      })
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: "Unable To Cancel The Client!",
        heightAuto: false,
     }).then(()=>{
      Swal.close();
     })
  })
  }
}
  CancelTcp(client:UdpClient ){
    if(this.CheckIfClientExistAndCancel(client, this.service.TcpClientList)){
      Swal.fire({
        icon: 'success',
        title: "Tcp Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.TcpClientList.indexOf(client, 0);
        if (index > -1) {
          this.service.TcpClientList.splice(index, 1);
        }
      })
    }
    else{
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelTcpClient', client).subscribe(response=>{
     Swal.fire({
        icon: 'success',
        title: "Tcp Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.TcpClientList.indexOf(client, 0);
        if (index > -1) {
          this.service.TcpClientList.splice(index, 1);
        }
      })
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: "Unable To Cancel The Client!",
        heightAuto: false,
     }).then(()=>{
      Swal.close();
     })
  })
 }
}  
CancelSplunk(client:SplunkClient ){
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelSplunkClient', client).subscribe(response=>{
     Swal.fire({
        icon: 'success',
        title: "Splunk Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.SplunkClientList.indexOf(client, 0);
        if (index > -1) {
          this.service.SplunkClientList.splice(index, 1);
        }
      })
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: "Unable To Cancel The Client!",
        heightAuto: false,
     }).then(()=>{
      Swal.close();
     })
  })
  }
  CancelWebSocket(client:UdpClient ){
    if(this.CheckIfClientExistAndCancel(client, this.service.WebSocketClietList)){
      Swal.fire({
        icon: 'success',
        title: "WebSocket Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.WebSocketClietList.indexOf(client, 0);
        if (index > -1) {
          this.service.WebSocketClietList.splice(index, 1);
        }
      })
    }
    else{
    this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelWebSocketClient', client).subscribe(response=>{
     Swal.fire({
        icon: 'success',
        title: "Web Socket Client Cancelled",
       timer: 5000,
       heightAuto: false,
      }).then(() =>{
        const index = this.service.WebSocketClietList.indexOf(client, 0);
        if (index > -1) {
          this.service.WebSocketClietList.splice(index, 1);
        }
      })
    },(error) => {
      Swal.fire({
        icon: 'error',
        title: "Unable To Cancel The Client!",
        heightAuto: false,
     }).then(()=>{
      Swal.close();
     })
  })
  }
}
 
  CheckIfClientExistAndCancel(client:UdpClient, clientList:UdpClient[]){
    return ( clientList.some(item => item.port === client.port && item.Status.Status == 1))
  }
}
