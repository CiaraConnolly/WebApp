import { Component, OnInit } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from 'src/app/web.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent implements OnInit {
  replies: any = [];

  constructor(public webService: WebService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.replies = this.webService.getAllComments(this.route.snapshot.params['id']);
    
      console.log(Response)
    }
  }


