import { Component, OnInit } from '@angular/core';

import { GoalsDetails } from 'src/app/models/goals-details';
import { SignUpService } from 'src/app/services/sign-up.service';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  goalsDetails !: GoalsDetails;
  token !: string;
  
  constructor(
    private signupService: SignUpService,
    private registerService: RegisterService,
    private router: Router
  ) { 
    this.goalsDetails = this.signupService.goalsDetails;
  }

  ngOnInit(): void {
    this.token = this.registerService.token;
  }

  handlePrevClick() {
    this.signupService.selected = 1;
    this.router.navigateByUrl(`/signup/${this.token}/personal`);
  }

  handleSubmit() {
    // POST request using form data service!
    this.signupService.postData(this.token);
  }


}
