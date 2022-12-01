import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  signinForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  constructor() { }

  ngOnInit(): void {
  }

  signin() {
    console.log(this.signinForm.getRawValue());

    this.signinForm.reset();

    // TODO:
    // on success, navigate to /home page + store returned data (user, including token)
    // on failure, alert user with error message
    // Create & use userService(signupService equivalent)
  }
}
