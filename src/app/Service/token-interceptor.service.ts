import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { SocialService } from './social.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    // private injector: Injector
    private socialService : SocialService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    const accessToken = this.socialService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + accessToken
      }
   
    })
    
    return next.handle(req);
  }

}
