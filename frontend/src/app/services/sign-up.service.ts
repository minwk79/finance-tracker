import { Injectable } from '@angular/core';

import { PersonalDetails } from '../models/personal-details';
import { GoalsDetails } from '../models/goals-details';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  url = 'http://localhost:3000/api';
  public selected: number = 1; // 1(personal) | 2(goal)

  personalDetails !: PersonalDetails;
  goalsDetails !: GoalsDetails;

  constructor(private http: HttpClient, private router: Router) { 
    this.personalDetails = new PersonalDetails();
    this.goalsDetails = new GoalsDetails();
  }

  postData(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    // first do a POST request with personal details, 
    // make sure that username is unique 
    this.http.post(`${this.url}/users`, this.personalDetails, httpOptions)
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.router.navigateByUrl(`/signup/${token}/personal`);
          // notify user: duplicate username
          window.alert('Duplicate Username!');
          return of();
      }))
      .subscribe(user => {
        // PATCH request with goal details.
        let payload = {
          ...this.goalsDetails,
          user: user.id.toString()
        }
        this.http.patch(`${this.url}/goals/${user.goal}`, payload, httpOptions)
          .subscribe(goal => {
            // upon successful sign up, navigate to login page..
            window.localStorage.removeItem('email');
            this.router.navigateByUrl('/signin');
          })
      })

  }

}
