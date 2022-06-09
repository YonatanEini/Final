import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NamesService } from '../names.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements AfterViewInit  {
  @Input()name:string = " ";
  IsDecoding:boolean = false;
  IntervalId:any = 0;
  isLoading: boolean;
  constructor(private route:Router, private service:NamesService, private _http:HttpClient, private router:Router, private location: Location){
    this.route.routeReuseStrategy.shouldReuseRoute = () =>{
      return false;
    }
    this.isLoading = true;
  }
  ngAfterViewInit() {
    this.isLoading = false;
  }
  viewFrom(){
    this.route.navigateByUrl('/form/' +this.name);
  }
  ngOnInit(): void {
    this.IsDecoding = this.service.checkIfIsDeciding(this.name);
  }
  callpostRequest(){
    var responseCode;
    let transmitionRate = this.service.getTrnasmitionRate(this.name);
    let communicationType = this.service.getCommunicationType(this.name);
    if(transmitionRate > 0 && communicationType!=-1){
          this.service.addCommunicationDecoding(this.name);
          this._http.post<any>('https://localhost:44328/api/decodedIcd', { CommunicationType:this.name,DataDirection:communicationType,TransmissionRate:transmitionRate}).subscribe(response=>
          {
              responseCode = response.status;
          })
          this.IsDecoding = true;
          
          Swal.fire({
            icon: 'success',
            title: 'Decoded Frame Producer Started!',
            timer: 5000,
          }).then(function() {
            Swal.close;

        });
        
        
          
  }
  else{
    Swal.fire({
    icon: 'error',
      title: 'Missing Properties',
     text:'Fill Out Producer Properties!',
     timer: 5000,
  })
    Swal.close;
  }
}
callPostCancelRequest(){
  this._http.post<any>('https://localhost:44328/api/decodedIcd/CancelRequest', [this.name]).subscribe(response=>{
    this.IsDecoding = false; 
    this.service.removeFromDecodingList(this.name) 
   Swal.fire({
      icon: 'success',
      title: "Decoded of: "+this.name+ " has been canceled",
     timer: 5000,
    })
  },(error) => {
    Swal.fire({
      icon: 'error',
      title: "You Need To Activate Decoding Producer Before Cancelling It",
      timer: 5000,
   })  
})
}
NavigateToProperties()
{
this.location.replaceState('/edit');
}
}
