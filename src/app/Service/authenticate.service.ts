import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Data } from '../Models/data';
import { SocialService } from './social.service';
import { AlertController } from '@ionic/angular';
import {ProfileService} from './profile.service'
import { Toast } from '@capacitor/toast';

const showHelloToast = async () => {
  await Toast.show({
    text: 'Hello!',
  });
};
export class Users {
  name: String | undefined
  email: String | undefined;
  password: String | undefined;
}

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthenticateService, private router: Router) {}

//   // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//   //   return this.authService.isLoggedIn();
//   // }
//   canActivate() {
//     if (!this.authService.isLoggedIn()) {
//       this.router.navigate(['/login-form']);
//       return false;
//     }
//     return true;
//   }

// }
export class AuthenticateService {
  
  userData: any;
  user$: Observable<Data> | undefined;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public http: HttpClient,
    public socialService: SocialService,
    private alertController: AlertController,
    public profileService: ProfileService


  ) { 
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // console.log("data", localStorage.getItem("isLogin"));
        // localStorage.setItem('isLogin',JSON.stringify(true));
        JSON.parse(localStorage.getItem('user') || '{}');
      }

      else {
        localStorage.setItem('user', null!);
        JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('isLogin',JSON.stringify(true));

      }
    });
  }
  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
  
  SignIn(email: any, password: any) {
    this.http.post<any>('https://infodeltasys.nl/cportal/public/api/auth/login', {
      email: email,
      password: password,
      
    }).subscribe(res => {
      // console.log(res.success.token);
      this.socialService.storeUserData(res.success.token);

      if(res.success.token){
       
      this.profileService.getProfile()
      this.router.navigate(['']);

      var token:any=""
      token=localStorage.getItem('id_token')
      this.http.post<any>('https://infodeltasys.nl/cportal/public/api/auth/login_status', {
        login_status: 'online',
      },{headers: {'Authorization': `Bearer `+token}}).toPromise().then(res => {
         console.log(res); 
      }).catch((err) => {
        console.log(err);
      })
      // console.log(res); 
      }
    })
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
          console.log("logged");
          
        });
        this.SetUserData(result.user);
        this.router.navigate(['']);

        Toast.show({
          text:"Successfully LoggedIn",
        }); 
        this.router.navigate(['']);

      })
      .catch((error) => {
        
         Toast.show({
          text:error.message,
        });
        console.log(error.message);
        
      });
  }
  //sign up Method
  SignUp(name: any, email: any, password: any) {
    this.http.post<any>('https://infodeltasys.nl/cportal/public/api/auth/signup', {
      name: name,
      email: email,
      password: password
    }).subscribe(res => {
      console.log(res)
    });

    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if(user.emailVerified){
          this.router.navigate(['login-form']);
          console.log(user.emailVerified);
          
        }
        // console.log(result);
        // window.alert(result);
      })
      .catch((error) => {
        // window.alert(error.message);

        Toast.show({
          text:error.message,
        });
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((user: any) => {
        return user.sendEmailVerification();
        
      })
      .then((result) => {
        this.router.navigate(['verify-email']);
        this.checkEmailVerified()
        console.log(result);
        

        
      });
      
  }
  async checkEmailVerified(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.currentUser.then((user) => {
        if (user && user.emailVerified) {

         Toast.show({
          text:'Email is verified',
        });
          console.log('Email is verified');
          this.router.navigate(['/login-form']);
          resolve();
        } else {
          console.log('Email is not verified');
          Toast.show({
            text:'Email is not verified',
          });
          reject(new Error('Email is not verified'));
        }
      });
    });
  }
  
  
  //Reset Password Method
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //check user login for email verification auth
   isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);
    const bool=user !== null && user.emailVerified !== false ? true : false;
    console.log(bool);

    return user !== null && user.emailVerified !== false ? true : false;
  }

  //check user login for phone otp authentication
   isLoggedin(): boolean {
    const user = JSON.parse(localStorage.getItem('user_data') as string)
    console.log(user)
    return user !== null ? true : false
  }


  //set full user data we get
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out Method for email auth
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
     
      this.router.navigate(['login-form']);
    });
  }

  // Sign out Method for phone otp auth
  logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user_data');
      localStorage.removeItem('_grecaptcha');
      localStorage.removeItem('verificationId');
      localStorage.removeItem('user');
      this.router.navigate(['login-form']);
    })
  }


}
