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

  ngOnInit() {}

  login(data) {
    localStorage.setItem("token", "");
    this._user.login(data).subscribe((res) => {
      if (res.data == null) {
        this.toaster.showError(res.msg);
      } else {
        this._user.saveToken(res.data.jwtToken);
        const { data } = res;
        const role = data.userDetails.type;
        localStorage.setItem("role", role);
        if (role == "superAdmin" || role == "admin") {
          this.route.navigate(["/admin_home"]);
        } else this.route.navigate(["/request"]);
      }
    });
  }
}
