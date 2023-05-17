import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes,CanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  //   // loadChildren: () => import('./Home/home/home.module').then( m => m.HomePageModule)
  //   // loadChildren: () => import('./Home/home.module').then( m => m.HomePageModule),canActivate:[AuthGuard]

  // },
  {
    path: 'forget-password',
    loadChildren: () => import('./Auth/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'login-form',
    loadChildren: () => import('./Auth/login-form/login-form.module').then( m => m.LoginFormPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./Auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./Auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./Auth/login-form/login-form.module').then( m => m.LoginFormPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'all-users',
    loadChildren: () => import('./all-users/all-users.module').then( m => m.AllUsersPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule),canActivate:[AuthGuard]
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
