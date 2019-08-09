import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  constructor(
    private router: Router,
    private location: Location

  ) {
    if( window.location.pathname ==='/accounts' ){
      this.router.navigateByUrl('/accounts');
    }
    else this.router.navigateByUrl('/home');

  }
}

