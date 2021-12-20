import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-followerfeed',
  templateUrl: './followerfeed.component.html',
  styleUrls: ['./followerfeed.component.css']
})
export class FollowerfeedComponent implements OnInit {
  followerForm: any;
  followArray: any = [];
  userArray: any = [];
  id: any;
  replyForm: any;
  userId: any;
  userName: any;
  CIF = "https://prod-88.eastus.logic.azure.com:443/workflows/8fa7fa9dedc2489292c1a371d33041c2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IpbmrpTiTL_CRKwPhc0jgRYNOdY_n6AA8su22OnelJg";

  CNC = "https://prod-62.eastus.logic.azure.com:443/workflows/1f3baa067d0d4a6abb7acf4f60a043ea/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CkkqwQVxCE228uOAXi0uGMtejVLEBEzWnBmlw2a6QeU";

  constructor(public webService: WebService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.webService.getALLFollowers()
    console.log(this.webService.following)
    this.userId = sessionStorage.getItem("loginId")
    this.userName = sessionStorage.getItem("loginUser")
    this.replyForm = 
    this.formBuilder.group({
      postId: '',
      replyComment: '',
      userId:'',
      userName:'',
      });

}

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
