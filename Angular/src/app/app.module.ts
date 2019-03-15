import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdCardModule,
  MdChipsModule,
  MdInputModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdGridListModule,
  MdDialogModule,
  MdSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Ng2Webstorage } from 'ng2-webstorage';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { myRoutes } from './app.routers';
import { DialogRegister, HomeComponent} from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventComponent } from './components/event/event.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventlistComponent } from './components/event/eventlist/eventlist.component';
import { EventdetailComponent } from './components/event/eventdetail/eventdetail.component';
import { TextfilterPipe } from './textfilter.pipe';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { GlobalsService } from './services/globals.service';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MdTableModule } from '@angular/material';

export const firebaseConfig = {
  apiKey: 'AIzaSyC8WV1odr4k_8Z7GEQ-ETg9o6VkwmqMylk',
  authDomain: 'mwap-79e5b.firebaseapp.com',
  databaseURL: 'https://mwap-79e5b.firebaseio.com',
  storageBucket: 'mwap-79e5b.appspot.com',
  messagingSenderId: '937264702565'
};

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    HomeComponent,
    RegisterComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    EventComponent,
    UserComponent,
    DashboardComponent,
    EventlistComponent,
    EventdetailComponent,
    TextfilterPipe,
    DialogRegister,
  ],
  entryComponents: [DialogRegister],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule,
    MdCardModule,
    MdChipsModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdGridListModule,
    MdDialogModule,
    MdSnackBarModule,
    myRoutes,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    HttpClientModule,
    Ng2Webstorage,
    InfiniteScrollModule,
    MdTableModule
  ],
  providers: [GlobalsService, AuthGuard, AuthService, ProfileService, HttpService, AdminGuard, UserService, HashLocationStrategy],
  bootstrap: [AppComponent]
})
export class AppModule { }
