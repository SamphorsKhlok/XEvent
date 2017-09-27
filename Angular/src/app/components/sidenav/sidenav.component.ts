import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isAdmin : Boolean = false;
  links = [
    {
      title: "Home",
      icon: "home",
      link: "/"
    },
    {
      title:"Login",
      icon: "lock",
      link: "/login",
    },
    {
      title: "Profile",
      icon: "account_circle",
      link: "/profile"
    },
    {
      title: "Event",
      icon: "event",
      link: "/event"
    },
    {
      title: "User",
      icon: "assignment_ind",
      link: "/user"
    },
    {
      title: "Daskboard",
      icon: "trending_up",
      link: "/dashboard"
    },
  ];
  constructor(private profileService: ProfileService , private authService: AuthService) {
    this.isAdmin = this.profileService.isAdmin(this.authService.getUserID());
  }

  ngOnInit() {
    if(this.isAdmin){
      this.links = [
        {
          title: "Home",
          icon: "home",
          link: "/"
        },
        {
          title: "Profile",
          icon: "account_circle",
          link: "/profile"
        },
        {
          title: "Event",
          icon: "event",
          link: "/event"
        },
        {
          title: "User",
          icon: "assignment_ind",
          link: "/user"
        }
      ];
    }else {
      this.links = [
        {
          title: "Home",
          icon: "home",
          link: "/"
        },
        {
          title: "Profile",
          icon: "account_circle",
          link: "/profile"
        }
      ];
    }
  }

}
