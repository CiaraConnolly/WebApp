import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/**country stuff */
import { CountriesComponent } from './countries.component';
import { CountryComponent } from './country.component';
/**country stuff */
/**sport stuff */
import { SportsComponent } from './sports.component';
import { SportComponent } from './sport.component';
/**sport stuff*/
import { EditTeamComponent } from './edit-teams.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './nav.component';
import {NgxPaginationModule} from 'ngx-pagination';

var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  /**country stuff */
  {
    path: 'countries',
    component: CountriesComponent
  },

  {
    path: 'countries/:id',
    component: CountryComponent
    },
  /**country stuff */

  /**sport stuff */
  {
    path: 'sports',
    component: SportsComponent
  },

  {
    path: 'sports/:id',
    component: SportComponent
    },
  /**sport stuff*/
  {
    path: 'countries/:c_id/edit-teams/:t_id',
    component: EditTeamComponent
  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    /**country stuff */
    CountriesComponent,
    HomeComponent,
    CountryComponent,
    /**country stuff */
    SportsComponent,
    SportComponent,
    NavComponent,
    EditTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgxPaginationModule,
    AuthModule.forRoot( {
      domain:'dev-beq-bplp.us.auth0.com',
      clientId: 'Ga1QAHtTKbej2WPypCMd4gmJc63XNd6i'
      })
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
