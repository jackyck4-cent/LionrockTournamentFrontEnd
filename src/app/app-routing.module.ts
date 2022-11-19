import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from './shared/auth.guard';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { TnListPageComponent } from './pages/tn-list-page/tn-list-page.component';

const routes: Routes = [
//  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}