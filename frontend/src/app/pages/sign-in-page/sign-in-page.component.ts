import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'; 

import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  hidePW = true;
  error: boolean | null = null;

  signinForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rememberMe: new FormControl(false)
  })

  constructor(
    private signinService: SignInService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signin() {
    let body = this.signinForm.getRawValue();
    const observer = {
      next: (user: any) => {
        window.localStorage.setItem('user', JSON.stringify(user));  // OR, just save the token instead of user...
        // redirect to /home page
        this.router.navigateByUrl('/home');
      },
      error: (err: Error) => {
        // set error to true and set back to false.. 
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    }
    this.signinService.signin(body).subscribe(observer);
    this.signinForm.reset();
  }

  toggleRememberMe() {
    this.signinForm.getRawValue().rememberMe = !this.signinForm.getRawValue().rememberMe;
  }


}
