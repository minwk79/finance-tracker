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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public selected: number = 1; // 1(personal) | 2(goal)


  personalDetails !: PersonalDetails;
  goalsDetails !: GoalsDetails;

  constructor(private http: HttpClient, private router: Router) { 
    this.personalDetails = new PersonalDetails();
    this.goalsDetails = new GoalsDetails();
  }

  
  signupPersonal() {
    return this.http.post(`${this.url}/users`, this.personalDetails, this.httpOptions);
  }

  signupGoals(payload: any, goal: any) {
    return this.http.patch(`${this.url}/goals/${goal}`, payload, this.httpOptions);
  }

}
