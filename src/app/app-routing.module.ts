import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from './shared/auth.guard';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { TnListPageComponent } from './pages/tn-list-page/tn-list-page.component';
import { TnDetailPageComponent } from './pages/tn-detail-page/tn-detail-page.component';
import { BoutGridSmallComponent } from './components/bout-grid-small/bout-grid-small.component';
import { TnManagePageComponent } from './pages/tn-manage-page/tn-manage-page.component';
import { TnCreatePageComponent } from './pages/tn-create-page/tn-create-page.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'tn-list', component: TnListPageComponent },
  { path: 'bout-grid-small', component: BoutGridSmallComponent },
  
  { path: 'tn-detail',
    children: [
      { path: ':id', component: TnDetailPageComponent },
      { path: '**', redirectTo: '/tn-list' },
    ],
  },
  { path: 'tn-manage',
    children: [
      { path: ':id', component: TnManagePageComponent },
      { path: '**', redirectTo: '/tn-list' },
    ],
  },
  { path: 'tn-create',
    children: [
      { path: ':id', component: TnCreatePageComponent },
      { path: '', component: TnCreatePageComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
