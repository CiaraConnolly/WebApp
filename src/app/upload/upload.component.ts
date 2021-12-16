import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  subNewForm: any;
  selectedfile: any;
  createdBy: any = sessionStorage.getItem("loginId")
  userName: any = sessionStorage.getItem("loginUser")
  IUPS = "https://prod-65.eastus.logic.azure.com:443/workflows/3b91c2d0f1c341d88c56870a09600916/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tVxHOGWXIveKfquWVhR97o4U4SapoA008MDsEVseEVc";
  CNP = "https://prod-54.eastus.logic.azure.com:443/workflows/e769a58d8f8341cea27caa7a4a41e1aa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aBj-1dj4eF82V7kjmvD09Id3JUL1P0Ha459tZ9eLqsQ";

  constructor(public webService: WebService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.subNewForm = 
    this.formBuilder.group({
      createdBy: '',
      date: '',
      filePath: '',
      id: '',
      postComment: '',
      replyComment: '',
      userName:''
      });
  }

viewImages() {
  this.webService.getImages();
  }

viewPosts() {
    this.webService.getPosts();
    }

submitNewAsset() {
  this.postMedia(this.subNewForm.value)
  .subscribe((response: any) => {
    this.subNewForm.reset();
    console.log(response);
    console.log(this.subNewForm.value);
  })
}

onFileSelect(event: any) {
  /**testing event  change below */
  console.log(event)
  this.selectedfile = <File>event.target.files[0];
  console.log(this.selectedfile)
  console.log(this.selectedfile.name)
}

postMedia(data: any) {
  let postData = new FormData();
  postData.append("createdBy", this.createdBy);
  postData.append("date", data.date);
  postData.append("File", this.selectedfile, this.selectedfile.name);
  postData.append("id", data.id);
  postData.append("postComment", data.postComment);
  postData.append("replyComment", data.replyComment);
  postData.append("userName", this.userName);

  return this.http.post(this.CNP, postData); 
}
}
