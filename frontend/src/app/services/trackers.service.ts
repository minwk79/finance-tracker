import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackersService {
  url = 'http://localhost:3000/api/trackers';

  constructor(private http: HttpClient) { }

  getTrackersByUser(userId: string) {
    return this.http.get(`${this.url}/user/${userId}`);
  }

}
