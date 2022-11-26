import { Component, OnInit } from '@angular/core';

import { RegisterService } from 'src/app/services/register.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { PersonalDetails } from 'src/app/models/personal-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  personalDetails !: PersonalDetails;
  token !: string;
  email !: string;

  constructor(
    public registerService: RegisterService,
    private signupService: SignUpService,
    private router: Router) { 
      this.personalDetails = this.signupService.personalDetails;
    }

  ngOnInit(): void {
    this.token = this.registerService.token;
    this.email = window.localStorage.getItem('email') || '';
    this.signupService.personalDetails.email = this.email;
  }

  handleClick() {
    // routerLink to 'address'
    this.signupService.selected = 2;
    this.router.navigateByUrl(`/signup/${this.token}/goals`);
  }
}
