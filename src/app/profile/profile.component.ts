import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: any;

  constructor(public webService: WebService, private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('loginId');
    console.log(sessionStorage.getItem('loginId'))
    console.log(this.id);
    this.webService.getOneUser(this.id)
  }

}
