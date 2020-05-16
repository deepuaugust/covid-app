import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../../services/request.service";
import { ToasterService } from "../../services/toaster.service";
import { RequestCellRendererComponent } from "../cell_renderer/requestCellRenderer/cell_renderer.component";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"],
})
export class RequestsComponent implements OnInit {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  isVolunteer = this.user.role && this.user.role.requestReadAccess;
  requests = [];
  categories = [];
  status = [];
  filtered_requests = [];
  selectedCategory: string;
  selectedStatus: string;
  columnDefs = [];
  rowData = [];
  countryList = countries;
  statuses = utils.statuses;
  communicationModes = utils.communicationModes;

  constructor(
    private _request: RequestService,
    private toaster: ToasterService,
    private route: Router
  ) {}

  ngOnInit() {
    this._request.listByRole(this.user._id).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else {
          age: 834;
          contactFullName: "ഇസ്ഹാഖ് മുഹമ്മദ്‌";
          contactPhone: "009166666666";
          created_at: "2020-05-16T09:37:28.992Z";
          currentCountry: "United Arab Emirates / +971";
          district: "PALAKKAD";
          fullName: "PRIYATHA P";
          gender: "F";
          postal: "673012";
          status: "pending";
          supportRequested: "ഭക്ഷണ സാധനങ്ങൾ ഇല്ലായ്മ";
          supportRequiredFor: "AFHAM";
          token: "13/07/421";

          this.requests = res.data;
          this.columnDefs = [
            {
              headerName: "Token #",
              field: "token",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Full Name",
              field: "fullName",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Contact FullName",
              field: "contactFullName",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Support Requested",
              field: "supportRequested",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Status",
              field: "status",
              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Current Country",
              field: "currentCountry",
              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },

            {
              headerName: "Assigned To",
              field: "assignedTo",

              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Actions",
              field: "action",
              cellRendererFramework: RequestCellRendererComponent,
              cellStyle: { border: "1px solid lightgrey" },
            },
          ];
          this.rowData = this.requests;
        }
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  }

  getitemFromList(key, value, list = [], valueKey) {
    const item = list.filter((d) => d[key] === value) || [];
    return item.length > 0 ? item[0][valueKey] : "";
  }
}
