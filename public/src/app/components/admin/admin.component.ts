import { Component, OnInit } from "@angular/core";
import { ToasterService } from "src/app/services/toaster.service";
import { RequestService } from "../../services/request.service";
import { Router } from "@angular/router";
import utils from "src/app/utils/utils.json";

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
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  constructor(
    private toaster: ToasterService,
    private route: Router,
    private _request: RequestService
  ) {}

  loadDahsboard() {
    this._request.summary(this.user._id).subscribe(
      (res) => {
        console.log(res.data, this.statuses);
        if (res.data == null) this.toaster.showError(res.message);
        else this.requestsSummary = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        this.route.navigate(["login"]);
      }
    );
  }



  ngOnInit() {
    console.log(this.statuses)
    if (this.user.type === undefined) {
      this.toaster.showError("Authentication Failed. Please login again.");
      this.route.navigate(["login"]);
      return;
    }
    this.loadDahsboard();
  }

  login() {}
}
