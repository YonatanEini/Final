import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export class ProducerStatus{
   name:string;
   currentStatus:string;
   UpdatedTime:string;
   TransimsissionRate:string;
   Type:string;
   constructor(producerName:string){
      this.name = producerName;
      this.currentStatus = "Wating For Propeties";
      this.UpdatedTime = "N/A"
      this.TransimsissionRate = "N/A"
      this.Type = "N/A"
   }
   UpdateAfterForm(rate:number, type:string){
      this.currentStatus = "Wating To Run";
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
    this.UpdatedTime = today.getHours() + ":" + minutesAddition + minutes + ":"+ secondsAddition + seconds;
    this.TransimsissionRate = rate.toString();
    this.Type = type.toString();
   }
   UpdateSituation(situation:string)
   {
      this.currentStatus = situation;
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
    this.UpdatedTime = today.getHours() + ":" + minutesAddition + minutes + ":"+ secondsAddition + seconds;
   }

}
export class AzalazedObject{
   current_velocity:number;
   current_wind_speed:number;
   current_height:number;
   light_eng:number;
   light_ready:number;
   light_Copilot:number;
   time:string;
   date:Date;
   constructor(velocity:number, wind_speed:number, height:number, end:number, ready:number, copliilot:number, time:string, date:Date ){
      this.current_velocity = velocity;
      this.current_wind_speed = wind_speed;
      this.current_height = height;
      this.light_eng = end;
      this.light_ready = ready;
      this.light_Copilot = copliilot;
      this.time = time;
      this.date = date;
   }
}
export class ClientStatus{
   TotalFrames:number;
   Status:number;
   constructor(){
      this.TotalFrames = 0;
      this.Status = 0;
   }
}
export class UdpClient{
   port:number;
   Ip:string;
   ConsumerTopic:number[];
   CommunicationTypeAfterConvert:string[];
   CreationDate:string;
   Status:ClientStatus;
   constructor(port:number, ip:string, CommunicationName:number[]){
      this.port = port;
      this.Ip = ip;
      this.ConsumerTopic = CommunicationName;
      this.CommunicationTypeAfterConvert = [];
      this.CreationDate = "";
      this.Status = new ClientStatus();
   }
   
}
export class SplunkClient extends UdpClient{
   HttpEventCollectorToken:String;
   constructor(port:number, ip:string, CommunicationName:number[],splunkToken:string ){
      super(port, ip, CommunicationName);
      this.HttpEventCollectorToken = splunkToken;
   }
}
export class MongoClient extends UdpClient{
   DataBaseName:string;
   CollectionName:string;
   constructor(port:number, ip:string, CommunicationName:number[], DataBaseName:string, CollectionName:string){
    super(port, ip, CommunicationName);
     this.DataBaseName = DataBaseName ;
     this.CollectionName =  CollectionName;
   }
 }
export class cardData{
   aircarftName:string;
   transmitionRate:number;
   type:number;
   constructor(name:string, type:number, rate:number){
      this.aircarftName = name;
      this.transmitionRate = rate;
      this.type = type;
   }
}
@Injectable({
   providedIn: 'root',
 })
export class NamesService{
   OnHomePage:Boolean = true;
    cardList:cardData[] = [];
    NameList:string[] = [];
    InDecodingList:string[] = [];

    MongoDBclientList:MongoClient[] = [];
    UdpClientList:UdpClient[] = [];
    HttpClientList:UdpClient[] = [];
    WebSocketClietList:UdpClient[] = [];
    TcpClientList:UdpClient[] = [];
    SplunkClientList:SplunkClient[] = [];
    public showcards:boolean = true;
    public onGraphs = false;

    public ShowDashboard:boolean = false;
    public ShowAlert:boolean = false;

    ProducerStatues:ProducerStatus[] = []

    name:string = "";
    adminMode:boolean = false;

    keepIndex:number = 0;

    constructor(private _http:HttpClient){
       //initializing producer
       var p1 =  new ProducerStatus("FiberBoxDown");
       var p2 =  new ProducerStatus("FiberBoxUp");
       var p3 =  new ProducerStatus("FlightBoxDown");
       var p4 =  new ProducerStatus("FlightBoxUp");
       var p5 =  new ProducerStatus("LandingBox");
       this.ProducerStatues = [p1, p2, p3, p4, p5];
   }
    editAircraftProperties(craftName:string, type:number, rate:number){
       if( this.cardList.some(item => item.aircarftName === craftName))
       {
         let ItemIndex = this.cardList.findIndex((item => item.aircarftName == craftName));
         this.cardList[ItemIndex].type = type;
         this.cardList[ItemIndex].transmitionRate = rate;
       }
       else
       {
          this.cardList.push(new cardData(craftName,type,rate));
       }
    }
    editProducerPropertiesAfterForm(name:string, rate:number, type:string){
      if( this.ProducerStatues.some(item => item.name === name))
      {
         let ItemIndex = this.ProducerStatues.findIndex((item => item.name == name));
         this.ProducerStatues[ItemIndex].UpdateAfterForm(rate, type)
      }
      else
      {
         var newProducer = new ProducerStatus(name)
         newProducer.UpdateAfterForm(rate, type)
         this.ProducerStatues.push(newProducer)
      }
    }
    editProducerSituation(name:string, situation:string){
      if( this.ProducerStatues.some(item => item.name === name))
      {
         let ItemIndex = this.ProducerStatues.findIndex((item => item.name == name));
         this.ProducerStatues[ItemIndex].UpdateSituation(situation)
      }
    }
    
    getTrnasmitionRate(craftName:string):number{
      if( this.cardList.some(item => item.aircarftName === craftName))
      {
         let ItemIndex = this.cardList.findIndex((item => item.aircarftName == craftName));
         return this.cardList[ItemIndex].transmitionRate;
      }
      return -1;
    }
    getCommunicationType(craftName:string):number{
      if( this.cardList.some(item => item.aircarftName === craftName))
      {
         let ItemIndex = this.cardList.findIndex((item => item.aircarftName == craftName));
         return this.cardList[ItemIndex].type;
      }
      return -1;
    }
    addCommunicationDecoding(name:string)
    {
       this.InDecodingList.push(name);
    }
    removeFromDecodingList(name:string)
    {
      const index = this.InDecodingList.indexOf(name, 0);
      if (index > -1) {
         this.InDecodingList.splice(index, 1);
      }
    }
    checkIfIsDeciding(name:string):boolean
    {
       console.log(name);
      for(let i=0; i<this.InDecodingList.length; i++)
      {
         if(this.InDecodingList[i] == name)
            return true;
      }
      return false;
    }
    AddMongoClient(client:MongoClient)
    {
       this.MongoDBclientList.push(client);
    }
    AddUdpClient(client:UdpClient){
       this.UdpClientList.push(client);
    }
    AddHttpClient(client:UdpClient){
       this.HttpClientList.push(client);
    }
    AddTcpClient(client:UdpClient){
      this.TcpClientList.push(client);
   }  
   AddWebSocketClient(client:UdpClient){
      this.WebSocketClietList.push(client);
   }  
   AddSplunkClient(client:SplunkClient){
      this.SplunkClientList.push(client);
   }
   
}