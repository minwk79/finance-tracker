import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('user') || '')?.token;
    return !this.jwtHelper.isTokenExpired(token);
  }

  registerTokenAuthenticated(token: string) {
    return !this.jwtHelper.isTokenExpired(token);
  }

}
