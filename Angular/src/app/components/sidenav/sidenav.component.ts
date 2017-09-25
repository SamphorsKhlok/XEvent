import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
