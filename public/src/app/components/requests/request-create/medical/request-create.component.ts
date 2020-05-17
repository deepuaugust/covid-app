import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService } from "../../../../services/toaster.service";
import { UserService } from "src/app/services/user.service";
import { CategoryService } from "src/app/services/category.service";
import { RolesService } from "src/app/services/role.service";
import { MedicalRequestService } from "src/app/services/medicalRequest.service";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";

@Component({
  selector: "app-request-create",
  templateUrl: "./request-create.component.html",
  styleUrls: ["./request-create.component.css"],
})
export class RequestCreateMedicalComponent implements OnInit {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  heading = "";
  request = { createdBy: this.user._id };
  categories = [];
  roles = [];
  users = [];
  countryList = countries;
  isEditMode = false;

  statuses = []; // utils.statuses;
  communicationModes = utils.communicationModes;

  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private _user: UserService,
    private _request: MedicalRequestService,
    private toaster: ToasterService
  ) {
    const { url } = this.route;
    if (url.indexOf("edit") > -1) this.isEditMode = true;
  }

  loadData() {
    const { url } = this.route;
    if (url.indexOf("edit") > -1) {
      const id = this._route.snapshot.params["id"];
      this._request.getById(id).subscribe(
        (res) => {
          if (res.message == "success" && res.data[0]) {
            this.request = res.data[0];
          } else this.toaster.showError(res.message);
        },
        (error) => {
          this.toaster.showError(error.error.message);
          if (error.error.statusCode === 403) this.route.navigate(["login"]);
        }
      );
    }
  }

  ngOnInit() {
    this.loadData();
    const id = this._route.snapshot.params["id"];
    this.heading = id == undefined || id == null ? "Create" : "Edit";
  }

  createRequest = (request) => {
    this._request.create(request).subscribe(
      (res) => {
        if (res.message == "success")
          this.route.navigate(["/requests/medical"]);
        else this.toaster.showError(res.message);
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  };
}
