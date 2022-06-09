import { Component, OnInit } from '@angular/core';
import { NamesService } from '../names.service';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-signin-form',
  templateUrl: './login-signin-form.component.html',
  styleUrls: ['./login-signin-form.component.scss']
})
export class LoginSigninFormComponent implements OnInit {
  userName:string = "";
  passwd:string = "";
  adminPasswd:string = "";
  IsAdminMode:boolean;
  constructor(private _http:HttpClient, public service:NamesService) { 
      this.IsAdminMode = false;
  }

  ngOnInit(): void {
  }

  signIn(){
    if(this.userName != ""  && this.passwd != "") 
       {
         let getUrlPath = 'https://localhost:44328/api/decodedIcd/UserSignIn/' + this.userName + '/' + this.passwd
        this._http.get<any>(getUrlPath).subscribe(response=>
        {
          var string1 = JSON.stringify(response);
          var parsed = JSON.parse(string1);  
          let statsObject: UserModule = <UserModule>parsed; 
          console.log(statsObject.UsersAuthorization)
          
          this.service.name = statsObject.Username
            if (statsObject.UsersAuthorization == 0){
              this.service.adminMode = true;
            }
        }, (error) => {   
          Swal.fire({
            icon: 'error',
            title: 'Invalid Username Or Password',
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
          title: 'Fill Out Missing Details!',
          timer: 5000,
          heightAuto: false,
  
        }).then(() => {
          Swal.close();
        });
      }
     }

submitProperties(){
  if (this.IsAdminMode){
    this.adminSignup();
  }
  else{
  if(this.userName != ""  && this.passwd != "") 
     {
      this._http.post<any>('https://localhost:44328/api/decodedIcd/UserSignUp', {Username: this.userName,
      Password: this.passwd, UsersAuthorization: 1}).subscribe(response=>
      {
        this.service.name = this.userName

      }, (error) => {   
        Swal.fire({
          icon: 'error',
          title: 'Username Already Exist',
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
        title: 'Fill Out Missing Details!',
        timer: 5000,
        heightAuto: false,

      }).then(() => {
        Swal.close();
      });
    }
   }
  }

adminSignup(){
  if(this.userName != ""  && this.passwd != "" && this.adminPasswd != "") 
  {
   this._http.post<any>('https://localhost:44328/api/decodedIcd/AdminUserSignUp', {Username: this.userName,
   Password: this.passwd, UsersAuthorization: 0, AdminPassword : this.adminPasswd}).subscribe(response=>
   {
    this.service.name = this.userName
    this.service.adminMode = true;

   }, (error) => {   
     Swal.fire({
       icon: 'error',
       title: 'User Already Exist Or Incorrect Admin Password',
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
     title: 'Fill Out Missing Details!',
     timer: 5000,
     heightAuto: false,

   }).then(() => {
     Swal.close();
   });
 }
}

userNameChange(event:any){
  try{
  this.userName = event.traget.value
  }
  catch(e){}
 }

 passwdNameChange(event:any){
   try{
  this.passwd = event.traget.value
   }
   catch(e){}
 }

 adminPasswdChange(event:any){
  try{
    this.adminPasswd = event.traget.value
     }
     catch(e){}
 }
 SplunkCommunicationTypeCheckBox(event:any) {
  if ( event.target.checked ) {
    this.IsAdminMode = true;
    console.log("on")
  }
  else{
    this.IsAdminMode = false;
    console.log("off")

  }
}
}

export class UserModule{
  Username:string
  Password:string
  UsersAuthorization:number;
  constructor(user:string, passwd:string, type:number){
    this.Username = user;
    this.Password = passwd;
    this.UsersAuthorization = type;
  }
}
