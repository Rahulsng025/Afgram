import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Service/authenticate.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(public authService: AuthenticateService) {}

  ngOnInit() {
    this.authService.checkEmailVerified
  }

}
