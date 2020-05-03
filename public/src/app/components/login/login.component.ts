import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "../../services/toaster.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user = {};

  constructor(
    private _user: UserService,
    private route: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    document.getElementById("menu_id").style.display = "none";
    this._user.logout();
  }

  login(data) {
    localStorage.setItem("token", "");
    this._user.login(data).subscribe((res) => {
      if (res.data == null) {
        this.toaster.showError(res.msg);
      } else {
        const { data } = res;
        const role = data.userDetails.type;
        this._user.saveTokenUser(data.jwtToken, role, JSON.stringify(data.userDetails));
        if (role == "superAdmin" || role == "admin") {
          this.route.navigate(["/home"]);
          document.getElementById('menu_id').style.display = "block";
        } else {
          this.route.navigate(["/requests"]);}
          document.getElementById('menu_id').style.display = "block";
      }
    });
  }
}
