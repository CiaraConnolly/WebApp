import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  array: any = [];
  CNU = "https://prod-33.eastus.logic.azure.com:443/workflows/0fcd5fea2b984adfa7f19db277f2c2b1/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=j1lvbhUofUpmIJ0MV-pcMoEfV8ePJpYqI-7yu-8kJsE";

  constructor(public webService: WebService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = 
    this.formBuilder.group({
      userName: '',
      name: '',
      surName: '',
      location: '',
      DOB:'',
      email:'',
      password:'',
      about:'',
      //test followers
      followers:'',
      });
  }

  submitNewUser() {
    this.postUser(this.registerForm.value)
    .subscribe((response: any) => {
      console.log("submitNewUser")
      var array1 = response.followers.split('+');
      console.log(array1)
      console.log(this.registerForm.value);
      this.registerForm.reset();
      console.log(response);
      console.log(this.registerForm.value);
    })
  }

  postUser(data: any) {
    let postData = new FormData();
    postData.append("userName", data.userName);
    postData.append("name", data.name);
    postData.append("surName", data.surName);
    postData.append("location", data.location);
    postData.append("DOB", data.DOB);
    postData.append("email", data.email);
    postData.append("password", data.password);
    postData.append("about", data.about);
    
    //test follower
    this.array.push(data.followers)
    this.array.push("637746765364406942")
    //console.log(data.followers);
    //console.log("postUser")
    var str = this.array.join("+");
    //console.log(str)
    postData.append("followers", str);
    //console.log(data.followers);
    //console.log(postData.get("followers"))
  
    return this.http.post(this.CNU, postData); 
  }

}
