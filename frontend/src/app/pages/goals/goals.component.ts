import { Component, OnInit } from '@angular/core';

import { SignUpService } from 'src/app/services/sign-up.service';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.token = this.registerService.token;
  }

  handlePrevClick() {
    // TODO: Don't set the value if null;
    this.signupService.goalsDetails.monthly = this.goalsForm.getRawValue().monthlyFormControl || 0;
    this.signupService.goalsDetails.weekly = this.goalsForm.getRawValue().weeklyFormControl || 0;
    
    this.signupService.selected = 1;
    this.router.navigateByUrl(`/signup/${this.token}/personal`);
  }

  handleSubmit() {
    // TODO: Don't set the value if null;
    this.signupService.goalsDetails.monthly = this.goalsForm.getRawValue().monthlyFormControl || 0;
    this.signupService.goalsDetails.weekly = this.goalsForm.getRawValue().weeklyFormControl || 0;
    // POST request using form data service!
    this.signupService.postData(this.token);
  }

}
