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
  CIF = "https://prod-88.eastus.logic.azure.com:443/workflows/8fa7fa9dedc2489292c1a371d33041c2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IpbmrpTiTL_CRKwPhc0jgRYNOdY_n6AA8su22OnelJg";

  constructor(public webService: WebService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.webService.getALLFollowers()
    console.log(this.webService.following)

}
}
