import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  signupForm = new FormGroup({
    signupEmail: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }
  
  generateEmail() {
    console.log('sending email to', this.signupForm.getRawValue().signupEmail);
  } 
}
