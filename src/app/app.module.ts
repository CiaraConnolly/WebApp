import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { FollowerfeedComponent } from './followerfeed/followerfeed.component';

var routes: any = [
  {
    path: '',
    component: HomeComponent
    },
    {
    path: 'upload',
    component: UploadComponent
    },
    {
    path: 'profile',
    component: ProfileComponent
    },
    {
    path: 'login',
    component: LoginComponent
    },
    {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'feed',
    component: FollowerfeedComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ProfileComponent,
    LoginComponent,
    UploadComponent,
    RegisterComponent,
    FollowerfeedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
