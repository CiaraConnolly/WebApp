import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  followerForm: any;
  replyForm: any;
  followArray: any = [];
  userArray: any = [];
  id: any;
  f_id: any = [];
  userId: any;
  userName: any;
  CIF = "https://prod-88.eastus.logic.azure.com:443/workflows/8fa7fa9dedc2489292c1a371d33041c2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IpbmrpTiTL_CRKwPhc0jgRYNOdY_n6AA8su22OnelJg";

  //Followers stuff?
  //post 1 reply
  CNC = "https://prod-62.eastus.logic.azure.com:443/workflows/1f3baa067d0d4a6abb7acf4f60a043ea/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CkkqwQVxCE228uOAXi0uGMtejVLEBEzWnBmlw2a6QeU";

  constructor(public webService: WebService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("loginId")
    this.userName = sessionStorage.getItem("loginUser")
    this.webService.getPosts();
    this.getUserStuff();
    //this.webService.getAllComments(this.webService.posts_list.id);
    this.followerForm = 
    this.formBuilder.group({
      userName: '',
      name: '',
      surName: '',
      location: '',
      DOB:'',
      email:'',
      password:'',
      about:'',
      followers:'',
      id: '',
      });
    this.replyForm = 
    this.formBuilder.group({
      postId: '',
      replyComment: '',
      userId:'',
      userName:'',
      });
  }


  follow(createdBy:any) {
    console.log("adding follower")
    console.log(createdBy)
    this.f_id =  createdBy
    sessionStorage.setItem('followerID',this.f_id);

    this.postUser(this.followerForm.value)
    .subscribe((response: any) => {
      console.log("adding follower")
      //console.log(this.f_id)

      //DARREN GAVE BELOW
      //var array1 = response.followers.split('+');

      //console.log(array1)
      //console.log(this.followerForm.value);
      //console.log(response);
      //console.log(this.followerForm.value);
    })
  }

  postUser(data: any) {
    let postData = new FormData();
    postData.append("userName", this.webService.user.userName);
    postData.append("name", this.webService.user.name);
    postData.append("surName", this.webService.user.surName);
    postData.append("location", this.webService.user.location);
    postData.append("DOB", this.webService.user.DOB);
    postData.append("email", this.webService.user.email);
    postData.append("password", this.webService.user.password);
    postData.append("about", this.webService.user.about);
    postData.append("id", this.webService.user.id);
    //console.log(data.followers);
    //console.log("postUser")
    this.f_id = sessionStorage.getItem('followerID');
    this.followArray.push(this.webService.user.followers)
    this.followArray.push(this.f_id)

    var str = this.followArray.join("+");
    //console.log(str)
    postData.append("followers", str);
    sessionStorage.removeItem('followerID');
    //console.log(data.followers);
    //console.log(postData.get("followers"))
  
    return this.http.post(this.CIF, postData); 
  }

  //useful????
  getUserStuff(){
    this.id = sessionStorage.getItem('loginId');
    console.log("showing data retrived from get 1 user api")
    //console.log(this.webService.getOneUser(this.id))
    this.userArray = this.webService.getOneUser(this.id)
    //console.log(this.userArray)
    console.log(this.webService.user)
    console.log(this.webService.user.userName)
    console.log("showing data retrived from get 1 user api")

  }

  getReplies(postID:any){ 
    console.log(postID);
    this.webService.getAllComments(postID) 
  
    console.log(Response)
  }


  //POST stuff

  postComment( data: any, postId: any) {
    let postData = new FormData();
    postData.append("postId", postId);
    postData.append("replyComment", data.replyComment);
    postData.append("userId", this.userId );
    postData.append("userName", this.userName);
    
    return this.http.post(this.CNC, postData); 
    }

  submitReply(postId: any){
    console.log("postid before we do post to db")
    console.log(postId)
    //str test for later = postID
    this.postComment(this.replyForm.value, postId)
    .subscribe((response: any) => {
      console.log("postid")
      console.log(postId)
      console.log("reply form data")
      console.log(this.replyForm.value);
      this.replyForm.reset();
      console.log("response from post thingy")
      console.log(response);
      console.log("reply form data after reset")
      console.log(this.replyForm.value);
    })
  }

}
