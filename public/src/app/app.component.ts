import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private _user: UserService, private route: Router) {}

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  logout() {
    this.closeNav();
    this._user.logout();
  }

  goToHome() {
    this.closeNav();
    this.route.navigate(["home"]);
  }

  goToRequestHome() {
    this.closeNav();
    this.route.navigate(["requests/home"]);
  }
}
