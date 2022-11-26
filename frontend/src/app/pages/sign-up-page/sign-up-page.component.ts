import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { RegisterService } from 'src/app/services/register.service';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  userToken !: string;
  tokenValid !: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private registerService: RegisterService,
    public signupService: SignUpService
  ) { }

  ngOnInit(): void {
    console.log('register page init!');
    this.route.params.subscribe((params: any) => {
      this.userToken = params['token'];
    })
    // verify
    this.tokenValid = this.authService.registerTokenAuthenticated(this.userToken);
    // go to url /signup/<token>/personal 
    if (this.tokenValid) {
      this.registerService.token = this.userToken;
      this.router.navigateByUrl(`/signup/${this.userToken}/personal`);
    }
  }

}
