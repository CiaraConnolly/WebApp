 /** The import statement that enables the file to make use of the facilities of the
Angular Component library */
import { Component } from '@angular/core';
/**import web service into countriesComponent */
import { WebService } from './web.service';

 /** The Decorator that specifies the selector (HTML tag) to be used to refer to the
component (here, app-root – corresponding to the <app-root> tag used in 
D1: Introducing Angular 7
index.html) and the optional URLs for an HTML template and stylesheets to be
used when rendering the component. Note that there is a single HTML template
while the stylesheets are specified as a list. */

/**country stuff */
@Component({
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

 /** Finally, the class definition that contains the logic for the component. Here, we
set up a single variable called title with the value ‘D1’
 */
export class CountriesComponent {
  constructor(public webService: WebService) {}

  ngOnInit() {
    this.webService.show_all_countries();
    }

  page: number = 1;
  p: number = 1;
}
