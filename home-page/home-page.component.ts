import { Component, OnInit } from '@angular/core';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor( public service:NamesService) {
      this.service.OnHomePage = true;
      this.scrollTopPage()

   }

  ngOnInit(): void {
    this.scrollTopPage()
  }
  scrollTopPage(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
  });
  }
 }
