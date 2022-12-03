import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpendingsService {

  url = 'http://localhost:3000/api/spendings';

  constructor(private http: HttpClient) { }

  getSpendingById(spendingId: string) {
    return this.http.get(`${this.url}/${spendingId}`);
  }
}
