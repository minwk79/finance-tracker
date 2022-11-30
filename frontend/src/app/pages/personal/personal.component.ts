import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

import { RegisterService } from 'src/app/services/register.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { PersonalDetails } from 'src/app/models/personal-details';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from '../../validators/check-password-validator.directive';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  personalDetails !: PersonalDetails;
  token !: string;
  email !: string;
  confirmPassword = '';
  hidwPW = true;
  hideConfirmPW = true;

  // ref: https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6
  checkPasswordValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let PW = group.get('passwordFormControl')?.value;
    let confirmPW = group.get('confirmFormControl')?.value;
    return PW === confirmPW ? null : {notSame: true};
  };


  personalForm = new FormGroup({
    usernameFormControl: new FormControl('', Validators.required),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmFormControl: new FormControl(''),
  }, {
    validators: this.checkPasswordValidator
  }
  )

  matcher = new MyErrorStateMatcher();

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

  next() {
    // TODO: Compare password and confirm-password


    // routerLink to 'address'
    this.signupService.selected = 2;
    this.router.navigateByUrl(`/signup/${this.token}/goals`);
  }
}
