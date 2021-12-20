import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router, public webService: WebService) { }

  ngOnInit(): void {

  }

logOut(){
  sessionStorage.removeItem('loginId');
  sessionStorage.removeItem('loginUser');
}
}
