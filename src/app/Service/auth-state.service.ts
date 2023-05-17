import { Injectable } from '@angular/core';
import { SocialService } from './social.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  // private userState = new BehaviorSubject<boolean>(this.socialService.isLoggedIn());
  // userAuthState = this.userState.asObservable();

  constructor(
    public socialService: SocialService
  ) { }

  // setAuthState(value: boolean){
  //   this.userState.next(value);
  // }
}
