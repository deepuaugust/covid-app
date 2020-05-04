import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService } from "../../../services/toaster.service";
import { UserService } from "src/app/services/user.service";
import { CategoryService } from "src/app/services/category.service";
import { RolesService } from "src/app/services/role.service";
import { RequestService } from "src/app/services/request.service";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";

@Component({
  selector: "app-request-create",
  templateUrl: "./request-create.component.html",
  styleUrls: ["./request-create.component.css"],
})
export class RequestCreateComponent implements OnInit {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  heading = "";
  request = { createdBy: this.user._id };
  categories = [];
  roles = [];
  users = [];
  countryList = countries;

  statuses = []; // utils.statuses;
  communicationModes = utils.communicationModes;

  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private _user: UserService,
    private _category: CategoryService,
    private _roles: RolesService,
    private _request: RequestService,
    private toaster: ToasterService
  ) {}

  loadCategories = () => {
    this._category.list().subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.categories = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  };

  onCategoryChange = (category) => {
    const { url } = this.route;
    this.roles = [];
    if (url.indexOf("create") > -1) {
      this.request["role"] = "";
      this.request["assignedTo"] = "";
    }
    this._roles.getByCategory(category).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else {
          this.roles = res.data;
          if (url.indexOf("edit") > -1) {
            this.request["role"] = this.request["role"]._id;
            this.onRoleChange(this.request["role"]);
          }
        }
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  };

  onRoleChange = (role) => {
    const { url } = this.route;
    this.users = [];
    if (url.indexOf("create") > -1) {
      this.request["assignedTo"] = "";
    }
    const query = { type: "regular", role };
    this._user.getAssignee(query).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else {
          this.users = res.data;
          if (url.indexOf("edit") > -1) {
            this.request["assignedTo"] = this.request["assignedTo"]._id;
          }
        }
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  };

  setStaus() {
    const { url } = this.route;
    if (url.indexOf("create") > -1) {
      this.request["status"] = 1;
    } else if (url.indexOf("edit") > -1)
      this.statuses = utils.statuses; //.filter((d) => d.value != 1);
  }

  loadData() {
    const { url } = this.route;
    if (url.indexOf("edit") > -1) {
      const id = this._route.snapshot.params["id"];
      this._request.getById(id).subscribe(
        (res) => {
          if (res.message == "success" && res.data[0]) {
            this.request = res.data[0];
            this.request["category"] = this.request["category"]._id;
            this.onCategoryChange(this.request["category"]);
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
    this.setStaus();
    this.loadCategories();
    this.loadData();
    const id = this._route.snapshot.params["id"];
    this.heading = id == undefined || id == null ? "Create" : "Edit";
  }

  createRequest = (request) => {
    this._request.create(request).subscribe(
      (res) => {
        if (res.message == "success") this.route.navigate(["/requests"]);
        else this.toaster.showError(res.message);
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  };
}
