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
  checkStatus: boolean = true;

  constructor(public router: Router, ) { }

  ngOnInit(): void {

  }
  isLoggedIn(){
  this.localStorageItem();
  }

  public localStorageItem(): boolean {
    if (sessionStorage.getItem('loginId'))
    return this.checkStatus
    else
    return true

}

logOut(){
  sessionStorage.removeItem('loginId');
}
}
