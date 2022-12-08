import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  url = 'http://localhost:3000/api/goals';

  constructor(private http: HttpClient) { }

  getGoalById(goalId: string) {
    return this.http.get(`${this.url}/${goalId}`);
  }
}
