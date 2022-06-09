import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NamesService, ProducerStatus } from '../names.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  aircraftName:string[] = [];
  ProducerStatues:ProducerStatus[]  = []
  constructor( public service:NamesService,private _http:HttpClient, private route:Router) { 
    this.ProducerStatues = service.ProducerStatues;
    this.service.OnHomePage = false;

  }

  ngOnInit(): void {
    this.service.OnHomePage = false;
    this.scrollTopPage();
    const url= "https://localhost:44328/api/decodedIcd";
    this._http.get<string[]>(url).subscribe(info => {
      for (let i=0; i<info.length;i++)
      {
        this.aircraftName[i] = info[i];
      }
    })
    console.log(this.aircraftName)
  }
  scrollTopPage(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
  });
  }
  callpostRequest(name:string){
    let transmitionRate = this.service.getTrnasmitionRate(name);
    let communicationType = this.service.getCommunicationType(name);
    if(transmitionRate > 0 && communicationType!=-1){
          this.service.addCommunicationDecoding(name);
          this._http.post<any>('https://localhost:44328/api/decodedIcd', { CommunicationType:name,DataDirection:communicationType,TransmissionRate:transmitionRate}).subscribe(response=>{ })
          let dateTime = new Date()
          this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Activate Prodcer: "+ name ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
          Swal.fire({
            icon: 'success',
            title: 'Decoded Frame Producer Started!',
            timer: 5000,
            heightAuto: false,
          }).then(() => {
            this.service.editProducerSituation(name, "Producer Is Running!")
            this.refreshPage();
            Swal.close;
        });  
  }
  else{
    Swal.fire({
    icon: 'error',
      title: 'Missing Properties',
     text:'Fill Out Producer Properties!',
     timer: 5000,
     heightAuto: false,

     
  }).then(() =>{
    this.service.editProducerSituation(name, "Wating For Properties")
    Swal.close;
  })
  }
}
callPostCancelRequest(name:string){
  this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelRequest', [name]).subscribe(response=>{
    this.service.removeFromDecodingList(name) 
    let dateTime = new Date()
    this._http.post<any>('https://localhost:44328/api/decodedIcd/InsertRequestDB', { Discribtion:"Cancel Prodcer: "+ name ,Username:this.service.name,Date:dateTime}).subscribe(res=>{})
   Swal.fire({
      icon: 'success',
      title: "Decoded of: "+ name + " has been canceled",
     timer: 5000,
     heightAuto: false,


    }).then(() =>{
      this.service.editProducerSituation(name, "Producer Is On Pause")
      this.refreshPage();
    })
  },(error) => {
    Swal.fire({
      icon: 'error',
      title: "You Need To Activate Decoding Producer Before Cancelling It",
      heightAuto: false,
   }).then(()=>{
    this.refreshPage();
    Swal.close();
   })
})
}
refreshPage()
{
  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  this.route.onSameUrlNavigation = 'reload';
  this.route.navigate(['/AnalyzedData']);
}
checkIfOnDecoding(name:string){
  const index = this.service.InDecodingList.indexOf(name, 0);
      if (index > -1) {
         return true
      }
  return false;
}
}
