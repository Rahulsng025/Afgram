import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../Home/home.module').then( m => m.HomePageModule),canActivate:[AuthGuard]
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),canActivate:[AuthGuard]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../all-users/all-users.module').then(m => m.AllUsersPageModule),canActivate:[AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationPageModule),canActivate:[AuthGuard]
      },
      {
        path: 'profile', // Update the path for the ProfilePageModule
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),canActivate:[AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
