 /** The import statement that enables the file to make use of the facilities of the
Angular Component library */
import { Component } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

/**edit-team stuff */
@Component({
  selector: 'edit-teams',
  templateUrl: './edit-teams.component.html',
  styleUrls: ['./edit-teams.component.css']
})

export class EditTeamComponent {

  updateForm: any;
  c_id: any;
  t_id: any;

  constructor(private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {}


  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      Name: ['', Validators.required],
      NOC: ['', Validators.required],
      Discipline: ['', Validators.required],
      Event: ['', Validators.required]
      });
    
    this.c_id = this.route.snapshot.params['c_id']
    this.t_id = this.route.snapshot.params['t_id']

    this.team = this.webService.fetch_one_team(this.c_id, this.t_id);
    

    this.webService.fetch_one_team(this.c_id, this.t_id).subscribe((res: any) => {
      this.updateForm.setValue({
        Name: res['Name'],
        NOC: res['NOC'],
        Discipline: res['Discipline'],
        Event: res['Event']
      });
    });

    }
    

    country: any;
    team: any = [];

  onUpdate(): any {
    this.webService.editTeam(this.c_id, this.t_id, this.updateForm.value)
    .subscribe((res: any) => {
      this.updateForm.reset();
      this.team = this.webService.fetch_one_team(this.c_id, this.t_id);
    })

  }
  isInvalid(control: any) {
    return this.updateForm.controls[control].invalid &&
    this.updateForm.controls[control].touched;
  }

  isUntouched() {
    return this.updateForm.controls.Name.pristine ||
    this.updateForm.controls.NOC.pristine || 
    this.updateForm.controls.Discipline.pristine ||
    this.updateForm.controls.Event.pristine;
    }

  isIncomplete() {
    return this.isInvalid('Name') ||
    this.isInvalid('NOC') ||
    this.isInvalid('Discipline') ||
    this.isInvalid('Event') ||
    this.isUntouched();
  }


}