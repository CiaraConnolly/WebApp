import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  user: any;
  pass: any;

  constructor(public webService: WebService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = 
    this.formBuilder.group({
      userName: '',
      password:''
      });
  }

  login() {

    this.webService.getLoginDetails(this.user, this.pass);
    console.log(this.webService.getLoginDetails(this.user, this.pass));
    console.log(this.loginForm.value);
    console.log(this.user)
    sessionStorage.setItem('loginUser',this.user);
    console.log(this.webService.loggeduser)
    console.log(this.webService.loggeduser.userName)
    this.webService.getOneUser(this.loginForm.value)
    this.loginForm.reset();
    }


    onKey(event: any) {
      /**testing event  change below */
      console.log(event)
      this.user = event.target.value;
      console.log(this.user)
    }

    onKey2(event: any) {
      /**testing event  change below */
      /**testing event  change below */
      console.log(event)
      this.pass = event.target.value;
      console.log(this.pass)
    }

}
