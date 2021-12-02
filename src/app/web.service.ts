import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    private countryID: any
    private sportID: any
    country_list: any = [];
    sport_list: any = [];

    constructor(public http: HttpClient) {

    }

    show_all_countries() { 
        return this.http.get('http://localhost:5000/api/v1.0/countries').subscribe((response: any) => {
            this.country_list = response;
            })
    }

    get_total_pages() { 
        return this.http.get('http://localhost:5000/api/v2.0/countries');
    }

    show_one_country(id: any) {
        this.countryID = id;
        return this.http.get('http://localhost:5000/api/v1.0/countries/'+id);
    }

    fetch_all_teams(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/countries/'+id + '/teams');
    }

    fetch_one_team(c_id: any, t_id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/countries/' + c_id + '/teams/' + t_id);
    }

    postTeam(team: any) {
        let postData = new FormData();
        postData.append("Name", team.Name);
        postData.append("NOC", team.NOC);
        postData.append("Discipline", team.Discipline);
        postData.append("Event", team.Event);

        return this.http.post('http://localhost:5000/api/v1.0/countries/' + this.countryID + '/teams', postData); 
    }

    editTeam(c_id: any, t_id: any, team: any) {
        let postData = new FormData();
        postData.append("Name", team.Name);
        postData.append("NOC", team.NOC);
        postData.append("Discipline", team.Discipline);
        postData.append("Event", team.Event);
        return this.http.put('http://localhost:5000/api/v1.0/countries/' + c_id + '/teams/' + t_id, postData); 
    }

      // Delete
    delete_team(c_id: any, t_id: any) {
        return this.http.delete('http://localhost:5000/api/v1.0/countries/' + c_id + '/teams/' + t_id); 
    }


    /**Sport stuff */
    
    get_sports() { 
        return this.http.get('http://localhost:5000/api/v1.0/sports').subscribe((response: any) => {
            this.sport_list = response;
            })
    }

    get_sport(id: any) {
        this.sportID = id;
        return this.http.get('http://localhost:5000/api/v1.0/sports/'+id);
    }

    get_athlete(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/sports/'+id + '/athletes');
    }

    post_athelete(athlete: any) {
        let postData = new FormData();
        postData.append("Name", athlete.Name);
        postData.append("NOC", athlete.NOC);
        postData.append("Discipline", athlete.Discipline);

        return this.http.post('http://localhost:5000/api/v1.0/sports/' + this.sportID + '/athletes', postData); 
    }

}