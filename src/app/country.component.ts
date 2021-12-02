 /** The import statement that enables the file to make use of the facilities of the
Angular Component library */
import { Component } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

/**country stuff */
@Component({
  selector: 'country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent {

  teamsForm: any;
  c_id: any;
  t_id: any;

  constructor(private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {}


  ngOnInit() {
    this.teamsForm = this.formBuilder.group({
      Name: ['', Validators.required],
      NOC: ['', Validators.required],
      Discipline: ['', Validators.required],
      Event: ['', Validators.required],
      });

    this.countries = this.webService.show_one_country(this.route.snapshot.params['id']);
    this.teams = this.webService.fetch_all_teams(this.route.snapshot.params['id']);
    }

    countries: any;
    teams: any = [];
    private countryID: any

  onSubmit() {
    this.webService.postTeam(this.teamsForm.value)
    .subscribe((response: any) => {
      this.teamsForm.reset();
      this.teams = this.webService.fetch_all_teams(this.route.snapshot.params['id']);
    })

  }
  isInvalid(control: any) {
    return this.teamsForm.controls[control].invalid &&
    this.teamsForm.controls[control].touched;
  }

  isUntouched() {
    return this.teamsForm.controls.Name.pristine ||
    this.teamsForm.controls.NOC.pristine || 
    this.teamsForm.controls.Discipline.pristine ||
    this.teamsForm.controls.Event.pristine;
    }

  isIncomplete() {
    return this.isInvalid('Name') ||
    this.isInvalid('NOC') ||
    this.isInvalid('Discipline') ||
    this.isInvalid('Event') ||
    this.isUntouched();
  }

  delete(c_id:any, t_id:any, i:any) {
    console.log(c_id, t_id);
    if(window.confirm('Do you want to go ahead?')) {
      this.webService.delete_team(c_id, t_id).subscribe((response:any) => {
        window.location.reload();
      })
    }
  }

}
