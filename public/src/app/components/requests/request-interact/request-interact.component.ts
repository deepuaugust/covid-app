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
  user = JSON.parse(localStorage.getItem("user"));

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
    console.log(id)
    this._request.interact(id).subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else {
        this.request = res.data;
        console.log(res.data);
      }
    });
  }
  ngOnInit() {
    this.loadData();
  }
}