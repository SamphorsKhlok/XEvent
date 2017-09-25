import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './components/home/home.component';
import { RegisterComponent} from "./components/register/register.component";
import { ErrorComponent} from "./components/error/error.component";
import { ProfileComponent} from "./components/profile/profile.component";
import { Guard } from './guard/guard';
import {EventComponent} from "./components/event/event.component";
import {UserComponent} from "./components/user/user.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";


const MY_ROUTES: Routes = [

  //end user pages
  {path : '', component: HomeComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'error', component: ErrorComponent},
  {path : 'profile', component: ProfileComponent, canActivate: [Guard]},

  //admin pages
  {path : 'event', component: EventComponent},
  {path : 'user', component: UserComponent},
  {path : 'dashboard', component: DashboardComponent},

  {path : 'login', component: LoginComponent},
  //always has one for unidentifiable link
  {path: '**', redirectTo:'/error'}
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
