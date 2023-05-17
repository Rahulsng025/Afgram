import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

 constructor(public authService: AuthenticateService,
    private router: Router) { }

  ngOnInit() {
  }
login(){}
public passwordType: string = 'password';
public passwordIcon: string = 'eye-off';

hideShowPassword() {
  this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}

}
