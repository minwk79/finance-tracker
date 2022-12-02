import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showNavbar = false;
  @Input() showSignin = false;
  @Input() showSignout = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoSignIn() {
    this.router.navigateByUrl('/signin');
  }

  signout() {
    window.localStorage.removeItem('user');
    this.router.navigateByUrl('/signin');
  }

}
