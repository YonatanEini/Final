import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NamesService } from './names.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private service:NamesService) { }
  canActivate() {
    return this.service.name != "";
  }
}
