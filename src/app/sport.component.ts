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
  selector: 'sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})

export class SportComponent {

  atheletesForm: any;

  constructor(private webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService) {}


  ngOnInit() {
    this.atheletesForm = this.formBuilder.group({
      Name: ['', Validators.required],
      NOC: ['', Validators.required],
      Discipline: ['', Validators.required]
      });

    this.sport = this.webService.get_sport(this.route.snapshot.params['id']);
    this.athlete = this.webService.get_athlete(this.route.snapshot.params['id']);
    }

    sport: any;
    athlete: any = [];

  onSubmit() {
    this.webService.post_athelete(this.atheletesForm.value)
    .subscribe((response: any) => {
      this.atheletesForm.reset();
      this.athlete = this.webService.get_athlete(this.route.snapshot.params['id']);
    })

  }
  isInvalid(control: any) {
    return this.atheletesForm.controls[control].invalid &&
    this.atheletesForm.controls[control].touched;
  }

  isUntouched() {
    return this.atheletesForm.controls.Name.pristine ||
    this.atheletesForm.controls.NOC.pristine || 
    this.atheletesForm.controls.Discipline.pristine
    }

  isIncomplete() {
    return this.isInvalid('Name') ||
    this.isInvalid('NOC') ||
    this.isInvalid('Discipline') ||
    this.isUntouched();
  }

}