import { Component, OnInit } from "@angular/core";
import { ToasterService } from "../../../services/toaster.service";
import { RequestService } from "src/app/services/request.service";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-request-interact",
  templateUrl: "./request-interact.component.html",
  styleUrls: ["./request-interact.component.css"],
})
export class RequestInteractComponent implements OnInit {
  request = {};
  updates = {};
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  isVolunteer = false;
  assignments = [];
  comments = [];
  requestdata = [];
  countryList = countries;
  statuses = [];
  communicationModes = utils.communicationModes;

  constructor(
    private _request: RequestService,
    private toaster: ToasterService,
    private _route: ActivatedRoute,
    private router: Router
  ) {
    this.isVolunteer = this.user.role && this.user.role.requestReadAccess;
  }

  loadData() {
    const id = this._route.snapshot.params["id"];
    this.requestdata = [];
    this._request.interact(id).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else {
          const { data } = res;
          this.request = data;
          this.request["requestID"].country = this.getCountries(
            this.request["requestID"].country
          );
          this.request["requestID"].communicationMedium = this.getMedium(
            this.request["requestID"].communicationMedium
          );
          this.setStaus();
          this.assignments = this.request["assignment"];
          this.comments = this.request["comments"];
          this.processRequestData();
          this.updates["id"] = data._id;
        }
      },
      (error) => {
        this.toaster.showError(error.error.message);
        this.router.navigate(["login"]);
      }
    );
  }

  getMedium(val) {
    const medium = utils.communicationModes.filter(
      (item) => item.value === val
    );
    return medium[0].label;
  }

  getCountries(code) {
    const country = countries.filter((item) => item.code === code);
    return country[0].name;
  }

  processRequestData() {
    for (let i = 0; i < this.assignments.length; i++) {
      if (i == 0) {
        this.requestdata.push({
          assigned:
            this.assignments[i].assignedTo.fName +
            " " +
            this.assignments[i].assignedTo.lName,
          status: this.getStatus(this.assignments[i].status),
          statusid: this.assignments[i].status,
          comment: "Request Initiated",
        });
      } else {
        this.requestdata.push({
          assigned: this.assignments[i].assignedTo
            ? this.assignments[i].assignedTo.fName +
              " " +
              this.assignments[i].assignedTo.lName
            : this.assignments[0].assignedTo.fName +
              " " +
              this.assignments[0].assignedTo.lName,
          status: this.getStatus(this.assignments[i].status),
          statusid: this.assignments[i].status,
          comment: this.comments[i - 1].comment,
        });
      }
    }
  }

  getStatus(value) {
    const status = utils.statuses.filter((item) => item.value == value);
    return status[0].label;
  }

  update(commentData) {
    let req = commentData;
    req["user"] = this.user._id;
    this._request.addComment(commentData).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.loadData();
      },
      (error) => {
        this.toaster.showError(error.error.message);
        this.router.navigate(["login"]);
      }
    );
  }

  setStaus() {
    if (this.isVolunteer)
      this.statuses = utils.statuses.filter((d) => d.value != 1);
    else
      this.statuses = utils.statuses.filter(
        (d) => d.value != 1 && d.value != 2 && d.value != 5
      );
  }

  ngOnInit() {
    this.loadData();
  }
}
