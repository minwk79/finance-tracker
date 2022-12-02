import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {      
    if (!this.authService.isAuthenticated()) {
      // redirect to sign in page
      this.router.navigateByUrl('/signin');
      return false;
    }
    return true;
  }
}
