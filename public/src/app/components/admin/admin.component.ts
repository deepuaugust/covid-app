import { Component, OnInit } from "@angular/core";
import { ToasterService } from "../../services/toaster.service";
import { RequestService } from "../../services/request.service";
import { Router } from "@angular/router";
import utils from "../../utils/utils.json";
import { RolesService } from "../../services/role.service";
import { CategoryService } from "../../services/category.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: [
    "./admin.component.css",
    "../../../assets/styles/rotating-card.css",
  ],
})
export class AdminComponent implements OnInit {
  statuses = utils.statuses.map((d) => d.label);
  requestsSummary = [];
  roleSummary = [];
  categorySummary = [];
  userSummary = [];

  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  type = this.user.type === "superAdmin" ? "admin" : "regular";
  userType = this.user.type === "superAdmin" ? "Admins" : "Service Providers";

  constructor(
    private toaster: ToasterService,
    private route: Router,
    private _request: RequestService,
    private _role: RolesService,
    private _category: CategoryService,
    private _user: UserService
  ) {}

  loadDahsboard() {
    this._request.summary(this.user._id).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.requestsSummary = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
    this._role.summary().subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.roleSummary = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
    this._category.summary().subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.categorySummary = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
    this._user.summary(this.type).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.userSummary = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  }

  ngOnInit() {
    if (this.user.type === undefined) {
      this.toaster.showError("Authentication Failed. Please login again.");
      this.route.navigate(["login"]);
      return;
    }
    this.loadDahsboard();
  }

  login() {}
}
