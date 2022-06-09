import { Component, OnInit } from '@angular/core';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-unauthorized-form',
  templateUrl: './unauthorized-form.component.html',
  styleUrls: ['./unauthorized-form.component.css']
})
export class UnauthorizedFormComponent implements OnInit {

  constructor(private service:NamesService) { 
    this.service.OnHomePage = false;
  }

  ngOnInit(): void {
  }

}
