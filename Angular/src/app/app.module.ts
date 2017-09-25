import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule ,
  MdListModule,
  MdSidenavModule,
  MdIconModule
} from '@angular/material';


import { AppComponent } from './app.component';
import 'hammerjs';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { myRoutes} from "./app.routers";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Guard } from './guard/guard';
import { EventComponent } from './components/event/event.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule,
    myRoutes
  ],
  providers: [Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
