import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientStatus, MongoClient, NamesService, SplunkClient, UdpClient } from '../names.service';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2'
import { deccodedProperties } from '../user.modeul';

@Component({
  selector: 'app-choose-clients-view',
  templateUrl: './choose-clients-view.component.html',
  styleUrls: ['./choose-clients-view.component.scss']
})
export class ChooseClientsViewComponent implements OnInit {
  showForm:boolean = false;
  showTcp:boolean = false;
  showUdp:boolean  = false;
  showMongo:boolean = false;
  showSplunk:boolean = false;
  showWebSocket:boolean = false;
  showHttp:boolean = false;

  UdpClien:UdpClient; //udp client
  TcpClien:UdpClient; //tcp client
  MongoclientProps:MongoClient; //mongodb client
  HttpClientProps:UdpClient; //http client
  WebSocketClient:UdpClient; //webSocket client
  SplunkClient:SplunkClient;
  
  constructor(public service:NamesService,private _http:HttpClient, private router: Router) { 
    this.service.OnHomePage = false;
    this.UdpClien = new UdpClient(11000, "127.0.0.1", []);
    this.TcpClien = new UdpClient(10000, "127.0.0.1", []);
    this.MongoclientProps = new MongoClient(27017, "127.0.0.1", [], "", "");
    this.HttpClientProps = new UdpClient(5000, "127.0.0.1", []);
    this.WebSocketClient = new UdpClient(-1, "", []);
    this.SplunkClient = new SplunkClient(8088,"127.0.0.1",[],"da77d6e0-d0c1-40ca-acc1-3442f4141970");

  }

  ngOnInit(): void {  
    window.scroll({ 
      top: 0, 
      left: 0, 
  });
  }
  TcpPortNumberChange(event:any){
    try{
    this.TcpClien.port = +event.currentTarget.value;
    }
    catch(e){}
   }
   UdpPortNumberChange(event:any)
   {
     try{
    this.UdpClien.port = +event.currentTarget.value;
     }
     catch(e){}
   }
   HttpPortNumberChange(event:any)
   {
     try{
    this.HttpClientProps.port = +event.currentTarget.value;
     }
     catch(e){}
   }
   WebSocketPortNumberChange(event:any)
   {
    try{
    this.WebSocketClient.port = +event.currentTarget.value
    }
    catch(e){}
   }
   MongdbPortNumberChange(event:any){
     try{
      this.MongoclientProps.port = +event.currentTarget.value
      console.log(this.MongoclientProps.port)
     }
     catch(e){ "problem"}
   }
   SplunkPortNumberChange(event:any){
     try{
    this.SplunkClient.port =+event.currentTarget.value
     }
     catch{}
   }
   

   TcpIPAdressChange(event:any){
     try{
    this.TcpClien.Ip = event.traget.value;
     }
     catch(e){}
   }
   UdpIPAdressChange(event:any){
     try{
      this.UdpClien.Ip = event.target.value;
     }
     catch(e){}
    }
    HttpIPAdressChange(event:any){
      try{
      this.HttpClientProps.Ip = event.target.value;
      }
      catch(e){}
    }
    WebSocketIPAdressChange(event:any){
      try{
      this.WebSocketClient.Ip = event.target.value;
      }
      catch(e){}
    }
   MongoIPAdressChange(event:any){
     try{
      this.MongoclientProps.Ip = event.target.value;
     }
     catch(e){}
    }
    SplunkIPAdressChange(event:any){
      try{
      this.SplunkClient.Ip = event.target.value;
      }
      catch(e){}
    }
    

   DataBaseNameChange(event:any){
     try{
     this.MongoclientProps.DataBaseName = event.traget.value;
     }
     catch(e){}
   }
   CollectionNameChange(event:any){
     try{
     this.MongoclientProps.CollectionName = event.traget.value;
     }
     catch(e){}
   }
   TokenNameChange(event:any){
     try{
     this.SplunkClient.HttpEventCollectorToken = event.target.value;
     }
     catch(e){}
   }

   
   TcpCommunicationTypeCheckBox(event:any) {
    if ( event.target.checked ) {
      this.TcpClien.ConsumerTopic.push(+event.target.value);
   }
   else
   {
    let ItemIndex = this.TcpClien.ConsumerTopic.findIndex((item => item == +event.target.value));
    this.TcpClien.ConsumerTopic.splice(ItemIndex, 1);
   }
}
UdpCommunicationTypeCheckBox(event:any) {
    if ( event.target.checked ) {
      this.UdpClien.ConsumerTopic.push(+event.target.value);
    }
    else
    {
      let ItemIndex = this.UdpClien.ConsumerTopic.findIndex((item => item == +event.target.value));
      this.UdpClien.ConsumerTopic.splice(ItemIndex, 1);
    }
}
HttpCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.HttpClientProps.ConsumerTopic.push(+event.target.value);
  }
  else
  {
    let ItemIndex = this.HttpClientProps.ConsumerTopic.findIndex((item => item == +event.target.value));
    this.HttpClientProps.ConsumerTopic.splice(ItemIndex, 1);
  }
}
WebSocketCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.WebSocketClient.ConsumerTopic.push(+event.target.value);
  }
  else
  {
    let ItemIndex = this.WebSocketClient.ConsumerTopic.findIndex((item => item == +event.target.value));
    this.WebSocketClient.ConsumerTopic.splice(ItemIndex, 1);  
  }
}
MongoCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.MongoclientProps.ConsumerTopic.push(+event.target.value);
  }
  else
  {
    let ItemIndex = this.MongoclientProps.ConsumerTopic.findIndex((item => item == +event.target.value));
    this.MongoclientProps.ConsumerTopic.splice(ItemIndex, 1);
  }
}
SplunkCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    console.log(+event.target.value)
    this.SplunkClient.ConsumerTopic.push(+event.target.value);
    console.log(this.SplunkClient.ConsumerTopic)
  }
  else
  {
      let ItemIndex = this.SplunkClient.ConsumerTopic.findIndex((item => item == +event.target.value));
      this.SplunkClient.ConsumerTopic.splice(ItemIndex, 1);
      console.log(this.SplunkClient.ConsumerTopic)
    }
}

  scrollTopPage(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
  });
  }



  startMongoClient(){
    if(this.MongoclientProps.Ip != ""  && this.MongoclientProps.port != -1 && this.MongoclientProps.ConsumerTopic.length > 0 && this.MongoclientProps.CollectionName != "" && this.MongoclientProps.DataBaseName != "") 
    {
     if (!this.CheckIfMongoClientExist(this.MongoclientProps.port)){
     this._http.post<any>('https://localhost:44328/api/decodedIcd/MongoClientRequest', {Port: this.MongoclientProps.port,
     Ip: this.MongoclientProps.Ip,
     DataBaseName: this.MongoclientProps.DataBaseName,
     CollectionName:this.MongoclientProps.CollectionName,
     ConsumerTopic: this.MongoclientProps.ConsumerTopic}).subscribe(response=>
     {
       this.MongoclientProps.CreationDate = this.GetCurrentHour();
       this.service.AddMongoClient(this.MongoclientProps);
       this.MongoclientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.MongoclientProps.ConsumerTopic);
       this.CreateStatusInterval(this.MongoclientProps)

       //setInterval(() => {this.ReadClientStatus(this.MongoclientProps) }, 1000)      
        //this.MongoclientProps = new MongoClient(-1, "", [], "", "");
       this.showForm = false;
       this.showMongo = false;
       let dateTime = new Date()
       this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Create Mongodb Client" ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
       Swal.fire({
         icon: 'success',
         title: 'MongoDB client has Connected!',
         timer: 5000,
         heightAuto: false,
       }).then(() => {
         Swal.close;
     });
     }, (error) => {   
       Swal.fire({
         icon: 'error',
         title: 'Error while Connecting MongoDB Client!',
         text: 'Invalid MongoDB Properties',
         timer: 5000,
         heightAuto: false,
       }).then(() => {
         Swal.close;
         
     });
     })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error while Connecting MongoDB Client!',
        text: 'MongoDB Client With Same Properties Already Exist!',
        timer: 5000,
        heightAuto: false,
      }).then(() => {
        Swal.close; 
    });
    }
   }
   else{
     Swal.fire({
       icon: 'error',
       title: 'Cannot Create MongoDB Client!',
       text: 'Fill Out Missing Properties',
       timer: 5000,
       heightAuto: false,

     }).then(() => {
       Swal.close();
     });
   }
  }

  startUdpClient(){
    if(this.UdpClien.Ip != ""  && this.UdpClien.port != -1 && this.UdpClien.ConsumerTopic.length  > 0 ) 
    {
      if (!this.CheckIfClientExist(this.UdpClien, this.service.UdpClientList)) {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/UdpClientRequest', {Port: this.UdpClien.port,
     Ip: this.UdpClien.Ip,
     ConsumerTopic: this.UdpClien.ConsumerTopic}).subscribe(response=>
     {
       this.UdpClien.CreationDate = this.GetCurrentHour();
       this.service.AddUdpClient(this.UdpClien);
       this.MongoclientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.MongoclientProps.ConsumerTopic);
       this.UdpClien.CommunicationTypeAfterConvert = this.convertFromEnum(this.UdpClien.ConsumerTopic);
       this.CreateStatusInterval(this.UdpClien)
       let dateTime = new Date()
       this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Create Udp Client" ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
              
       Swal.fire({
        icon: 'success',
        title: 'Udp Client Has Connected!',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });
      this.showForm = false;
      this.showUdp = false;
     },
     (error) => {     
      Swal.fire({
        icon: 'error',
        title: 'Cannot Connect Udp Client',
        text: 'Invalid Udp Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });                   //Error callback
    })
  }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error while Connecting  Udp Client!',
        text: 'Udp Client With Same Properties Already Exist!',
        timer: 5000,
        heightAuto: false,
      }).then(() => {
        Swal.close; 
    });
    }
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Cannot Connect Udp Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });                
    }
  }

  startTcpClient(){
    if(this.TcpClien.Ip != ""  && this.TcpClien.port != -1 && this.TcpClien.ConsumerTopic.length  > 0 ) 
    {
      if (!this.CheckIfClientExist(this.TcpClien, this.service.TcpClientList)){
    this._http.post<any>('https://localhost:44328/api/decodedIcd/TcpClientRequest', {Port: this.TcpClien.port,
     Ip: this.TcpClien.Ip,
     ConsumerTopic: this.TcpClien.ConsumerTopic}).subscribe(response=>
     {
      this.TcpClien.CreationDate = this.GetCurrentHour();
       this.service.AddTcpClient(this.TcpClien);
       this.TcpClien.CommunicationTypeAfterConvert = this.convertFromEnum(this.TcpClien.ConsumerTopic);
       this.CreateStatusInterval(this.TcpClien)
       let dateTime = new Date()
        this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Create Tcp Client" ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
       Swal.fire({
        icon: 'success',
        title: 'Tcp Client Has Connected!',
        timer: 5000,
        heightAuto: false,

      }).then(()=> {
        Swal.close;
    });                
      this.showForm = false;
      this.showTcp = false;
     },
     (error) => {    
      Swal.fire({
        icon: 'error',
        title: 'Cannot Connect Tcp Client',
        text: 'Invalid Tcp Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });                
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Error while Connecting  Tcp Client!',
      text: 'Tcp Client With Same Properties Already Exist!',
      timer: 5000,
      heightAuto: false,
    }).then(() => {
      Swal.close; 
  });         
   }
  }
   else{
     Swal.fire({
      icon: 'error',
      title: 'Cannot Connect Tcp Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });                
    }
  }


  startHttpClient()
  {
    if(this.HttpClientProps.Ip != ""  && this.HttpClientProps.port != -1 && this.HttpClientProps.ConsumerTopic.length  > 0 ) 
    {
      if (!this.CheckIfClientExist(this.HttpClientProps, this.service.HttpClientList)){
     this._http.post<any>('https://localhost:44328/api/decodedIcd/HttpProtocolClientRequest', {Port: this.HttpClientProps.port,
     Ip: this.HttpClientProps.Ip,
     ConsumerTopic: this.HttpClientProps.ConsumerTopic}).subscribe(response=>
     {
      this.HttpClientProps.CreationDate = this.GetCurrentHour();
       this.service.AddHttpClient(this.HttpClientProps);
       this.HttpClientProps.CommunicationTypeAfterConvert = this.convertFromEnum(this.HttpClientProps.ConsumerTopic);
       this.CreateStatusInterval(this.HttpClientProps)

       let dateTime = new Date()
        this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Create Http Client" ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
       Swal.fire({
        icon: 'success',
        title: 'Http Client Has Started',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });               
      this.showForm = false;
      this.showHttp = false;
    },
     (error) => {  
       Swal.fire({
        icon: 'error',
        title: 'Cannot Create Http Client',
        text: 'Invalid Client Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });         
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Error while Connecting Http Client!',
      text: 'Http Client With Same Properties Already Exist!',
      timer: 5000,
      heightAuto: false,
    }).then(() => {
      Swal.close; 
  });         
   }
  }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Cannot Create Http Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });         
    }
  }

  startWebSocketClient()
  {
    if(this.WebSocketClient.Ip != ""  && this.WebSocketClient.port != -1 && this.WebSocketClient.ConsumerTopic.length  > 0 ) 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/WebSocketClientRequest', {Port: this.WebSocketClient.port,
     Ip: this.WebSocketClient.Ip,
     ConsumerTopic: this.WebSocketClient.ConsumerTopic}).subscribe(response=>
     {
      this.WebSocketClient.CreationDate = this.GetCurrentHour();
       this.service.AddWebSocketClient(this.WebSocketClient);
       this.WebSocketClient.CommunicationTypeAfterConvert = this.convertFromEnum(this.WebSocketClient.ConsumerTopic);
       this.CreateStatusInterval(this.WebSocketClient)
       let dateTime = new Date()
        this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Create WebSocket Client" ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
       Swal.fire({
        icon: 'success',
        title: 'Web Socket client has started',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });         
      this.showForm = false;
      this.showWebSocket = false;
      this.WebSocketClient = new UdpClient(-1, "", []);
    },
     (error) => {                       
      Swal.fire({
        icon: 'error',
        title: 'Cannot Create Web Socket Client',
        text: 'Invalid Client Properties',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close;
    });         
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Cannot Create Web Socket Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });         
    }
  }

  startSplunkClient()
  {
    if(this.SplunkClient.Ip != ""  && this.SplunkClient.port != -1 && this.SplunkClient.ConsumerTopic.length  > 0 && this.SplunkClient.HttpEventCollectorToken!="") 
    {
     this._http.post<any>('https://localhost:44328/api/decodedIcd/SplunkClientRequest', {Port: this.SplunkClient.port,
     Ip: this.SplunkClient.Ip,
     ConsumerTopic: this.SplunkClient.ConsumerTopic, HttpEventCollectorToken: this.SplunkClient.HttpEventCollectorToken}).subscribe(response=>
     {
      this.SplunkClient.CreationDate = this.GetCurrentHour();
       this.service.AddSplunkClient(this.SplunkClient);
       this.SplunkClient.CommunicationTypeAfterConvert = this.convertFromEnum(this.SplunkClient.ConsumerTopic);
       this.CreateStatusInterval(this.SplunkClient)
       //setInterval(() => {this.ReadClientStatus(this.SplunkClient) }, 1000)      
       let dateTime = new Date()
        this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Create Splunk Client" ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
       Swal.fire({
        icon: 'success',
        title: 'Splunk Client Has Started!',
        timer: 5000,
        heightAuto: false,
      }).then(() => {
        Swal.close;
    });               
    this.showForm = false;
      this.showSplunk = false;
      //this.SplunkClient = new SplunkClient(-1, "", [], "");
    },
     (error) => {   
       //Error callback
      Swal.fire({
        icon: 'error',
        title: 'Cannot Create Splunk Client',
        text: 'Invalid Client Poperties',
        timer: 5000,
        heightAuto: false,
      }).then(() => {
        Swal.close;
    });         
    })
   }
   else{
    Swal.fire({
      icon: 'error',
      title: 'Cannot Create Splunk Client',
      text: 'Fill Out Missing Properties',
      timer: 5000,
      heightAuto: false,

    }).then(() => {
      Swal.close;
  });         
    }
  }

  ShowPage(){
    this.showForm = true;
    this.showTcp = true;
    this.showUdp = false;
    this.showMongo = false;
    this.showSplunk = false;
    this.showWebSocket = false;
    this.showHttp = false;
    this.scrollTopPage()

  }
  ShowUdp(){
    this.showForm = true;
    this.showUdp = true;
    this.showTcp = false;
    this.showMongo = false;
    this.showSplunk = false;
    this.showWebSocket = false;
    this.showHttp = false;
    this.scrollTopPage()


  }
  ShowMongo(){
    this.showForm = true;
    this.showMongo = true;
    this.showUdp = false;
    this.showTcp = false;
    this.showSplunk = false;
    this.showWebSocket = false;
    this.showHttp = false;
    this.scrollTopPage()


  }
  ShowSplunk(){
    this.showForm = true;
    this.showMongo = false;
    this.showUdp = false;
    this.showTcp = false;
    this.showSplunk = true;
    this.showWebSocket = false;
    this.showHttp = false;
    this.scrollTopPage()


  }
  ShowWebSocket(){
    this.showForm = true;
    this.showMongo = false;
    this.showUdp = false;
    this.showTcp = false;
    this.showSplunk = false;
    this.showWebSocket = true;
    this.showHttp = false;
    this.scrollTopPage()

  }
  ShowHttp(){
    this.showForm = true;
    this.showMongo = false;
    this.showUdp = false;
    this.showTcp = false;
    this.showSplunk = false;
    this.showWebSocket = false;
    this.showHttp = true;
    this.scrollTopPage()

  }
  GetCurrentHour(){
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
    return today.getHours() + ":" + minutesAddition + minutes + ":"+ secondsAddition + seconds;
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
CheckIfMongoClientExist(portNumber:number){
  return ( this.service.MongoDBclientList.some(item => item.port === portNumber))
}
CheckIfClientExist(client:UdpClient, clientList:UdpClient[]){
  return ( clientList.some(item => item.port === client.port))
}
ReadClientStatus(client:UdpClient){
  const url = "https://localhost:44328/api/decodedIcd/ClientStatus/" + client.Ip + "/" + client.port +"/" + client.ConsumerTopic[0]
  this._http.get<ClientStatus>(url).subscribe(info => {
    client.Status = info;
  })
}
ReadMongodbStatus(client:MongoClient){
  const url = "https://localhost:44328/api/decodedIcd/ClientStatus/" + client.Ip + "/" + client.port +"/" + client.ConsumerTopic[0]
  this._http.get<ClientStatus>(url).subscribe(info => {
    client.Status = info;
  })
}
CreateStatusInterval(client:UdpClient){
  const url = "https://localhost:44328/api/decodedIcd/ClientStatus/" + client.Ip + "/" + client.port +"/" + client.ConsumerTopic[0]
  var clientInterval = setInterval( () => {
    this._http.get<ClientStatus>(url).subscribe(info => {
      client.Status = info;
    },(error) => {  
       client.Status.Status = 1;
       clearInterval(clientInterval)
    })
  }, 1000);
}
}
