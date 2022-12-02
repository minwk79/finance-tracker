import { Component, OnInit } from '@angular/core';

import { SignUpService } from 'src/app/services/sign-up.service';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  hide = true;


  token !: string;

  goalsForm = new FormGroup({
    monthlyFormControl: new FormControl(this.signupService.goalsDetails.monthly, [Validators.required, Validators.min(0)]),
    weeklyFormControl: new FormControl(this.signupService.goalsDetails.weekly, Validators.min(0))
    // monthlyFormControl: new FormControl(null, [Validators.required, Validators.min(0)]),
    // weeklyFormControl: new FormControl(null, Validators.min(0))
  })
  
  constructor(
    private signupService: SignUpService,
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
  }

  ngOnInit(): void {
    this.token = this.registerService.token;
  }

  handlePrevClick() {
    let monthly = this.goalsForm.getRawValue().monthlyFormControl ?? 0;
    let weekly = this.goalsForm.getRawValue().weeklyFormControl ?? 0;
    if (monthly) {
      this.signupService.goalsDetails.monthly = monthly;
    }
    if (weekly) {
      this.signupService.goalsDetails.weekly = weekly;
    }
    
    this.signupService.selected = 1;
    this.router.navigateByUrl(`/signup/${this.token}/personal`);
  }

  handleSubmit() {
    this.signupService.goalsDetails.monthly = this.goalsForm.getRawValue().monthlyFormControl || 0;
    this.signupService.goalsDetails.weekly = this.goalsForm.getRawValue().weeklyFormControl || 0;

    this.signupService.signupPersonal()
      .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.router.navigateByUrl(`/signup/${this.token}/personal`);
          // notify user: duplicate username
          window.alert('Duplicate Username!');
          return of();
      }))
      .subscribe(user => {
        // PATCH request with goal details.
        let payload = {
          ...this.signupService.goalsDetails,
          user: user.id.toString()
        }
        this.signupService.signupGoals(payload, user.goal)
          .subscribe(goal => {
            // upon successful sign up, navigate to login page..
            // window.localStorage.removeItem('email');
            this.router.navigateByUrl('/signin');
            // snack bar here? or in signin page.. (first load)
            this.snackBar.open('Sign Up Complete!', 'dismiss', { duration: 3000 });
          })
      })

  }

}
