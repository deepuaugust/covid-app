import { Component, OnInit } from "@angular/core";
import { ToasterService } from "../../../services/toaster.service";
import { RequestService } from "src/app/services/request.service";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-request-interact",
  templateUrl: "./request-interact.component.html",
  styleUrls: ["./request-interact.component.css"],
})
export class RequestInteractComponent implements OnInit {
  request = {};
  updates = {};
  user = JSON.parse(localStorage.getItem("user"));
  assignments = [];
  comments = [];
  requestdata = [];
  countryList = countries;
  statuses = utils.statuses;
  communicationModes = utils.communicationModes;

  constructor(
    private _request: RequestService,
    private toaster: ToasterService,
    private _route: ActivatedRoute
  ) {}

  loadData() {
    const id = this._route.snapshot.params["id"];
    this.requestdata = [];
    this._request.interact(id).subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else {
        const { data } = res;
        this.request = data;
        this.assignments = this.request["assignment"];
        this.comments = this.request["comments"];
        this.processRequestData();
        this.updates["id"] = data._id;
      }
    });
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
          comment: 'Request Initiated',
        });
      } else {
        this.requestdata.push({
          assigned: this.assignments[i].assignedTo ?
            this.assignments[i].assignedTo.fName +
            " " +
            this.assignments[i].assignedTo.lName : this.assignments[0].assignedTo.fName +
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
    this._request.addComment(commentData).subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else this.loadData();
    });
  }

  ngOnInit() {
    this.loadData();
  }
}
