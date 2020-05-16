import { Component, OnInit } from "@angular/core";
import { ToasterService } from "../../../services/toaster.service";
import { Router } from "@angular/router";
import utils from "../../../utils/utils.json";

@Component({
  selector: "app-request-home",
  templateUrl: "./request-home.component.html",
  styleUrls: [
    "./request-home.component.css",
    "../../../../assets/styles/rotating-card.css",
  ],
})
export class RequestHomeComponent implements OnInit {
  statuses = utils.statuses.map((d) => d.label);
  requestsSummary = [];
  roleSummary = [];
  categorySummary = [];
  userSummary = [];

  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  type = this.user.type === "superAdmin" ? "admin" : "regular";
  userType =
    this.user.type === "superAdmin" ? "Admins" : "Volunteers/Service Providers";

  constructor(
    private toaster: ToasterService,
    private route: Router,
  ) {}

  loadDahsboard() {}

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
