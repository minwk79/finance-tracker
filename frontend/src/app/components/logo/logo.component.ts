import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() redirectURL = '/main';

  title = 'myTracker';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goto() {
    this.router.navigateByUrl(this.redirectURL);
  }

}
