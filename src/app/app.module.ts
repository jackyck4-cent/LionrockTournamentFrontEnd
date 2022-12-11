import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';

import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {WelcomeMessageComponent} from './components/welcome-message/welcome-message.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WelcomePageComponent} from './pages/welcome-page/welcome-page.component';
import {TnListPageComponent} from './pages/tn-list-page/tn-list-page.component';
import {TnListComponent} from './components/tn-list/tn-list.component';
import {TnDetailPageComponent} from './pages/tn-detail-page/tn-detail-page.component';
import {TnDetailComponent} from './components/tn-detail/tn-detail.component';
import { TnManagePageComponent } from './pages/tn-manage-page/tn-manage-page.component';
import { TnCreatePageComponent } from './pages/tn-create-page/tn-create-page.component';
import { SplitColumnsPipe } from './pipes/split-columns.pipe';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSortModule} from '@angular/material/sort';
import {BoutGridSmallComponent} from './components/bout-grid-small/bout-grid-small.component';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import { TreeComponent } from './components/tree/tree.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WelcomeMessageComponent,
    WelcomePageComponent,
    TnListPageComponent,
    TnListComponent,
    TnDetailPageComponent,
    BoutGridSmallComponent,
    TnDetailComponent,
    TnManagePageComponent,
    TnCreatePageComponent,
    SplitColumnsPipe,
    TreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSortModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatDatepickerModule,
    MatChipsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
