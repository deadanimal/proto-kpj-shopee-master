import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PAGESROUTE } from "../../shared/menu/menu-items";

var misc: any = {
  sidebar_mini_active: true,
};

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss']
})
export class HomeSidebarComponent implements OnInit {

  focus;
  public menuItems: any[];
  public isCollapsed = true;
  public menu;
  imgLogo = "assets/img/logo/Logo-KPJ.png";

  todos = [
    {
      note: "Jumpa Ketua Pengarah",
      time: "3.00 PTG",
      checked: "",
      color: "danger",
    },
    {
      note: "Siapkan bahan mesyuarat",
      time: "2.00 PTG",
      checked: "",
      color: "warning",
    },
    {
      note: "Jumpa En. Faizal",
      time: "12:00 TGH HARI",
      checked: "checked",
      color: "success",
    },
    {
      note: "Beri tugas kepada ahli pasukan",
      time: "10:00 PG",
      checked: "checked",
      color: "info",
    },
  ];
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.menu = PAGESROUTE;
    this.menuItems = this.menu.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }

  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }

  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }

}
