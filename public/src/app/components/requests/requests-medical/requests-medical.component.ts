import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../../../services/request.service";
import { ToasterService } from "../../../services/toaster.service";
import { RequestCellRendererComponent } from "../../cell_renderer/requestCellRenderer/cell_renderer.component";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";

@Component({
  selector: "app-requests",
  templateUrl: "./requests-medical.component.html",
  styleUrls: ["./requests-medical.component.css"],
})
export class RequestsMedicalComponent implements OnInit {
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
          this.requests = res.data;
          this.columnDefs = [
            {
              headerName: "Token #",
              field: "token",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Doctor Name",
              field: "doctorName",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Country",
              valueGetter: function (params) {
                let country = countries.filter(
                  (item) => item.code == params.data.country
                );
                return country[0].name;
              },
              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Area in the country",
              field: "area",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Age",
              field: "age",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Gender",
              field: "gender",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "COVID Status",
              field: "covidStatus",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Past Medical History",
              field: "medicalHistory",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Current Prescription",
              field: "currentPrescription",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Current Issues",
              field: "currentIssues",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Advice and prescription given",
              field: "advice",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Prescription Issued ?",
              field: "prescriptionIssue",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Medical Followup needed?",
              field: "medicalFollowup",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Mental Health/Social Follow-up?",
              field: "health",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Comments",
              field: "comments",
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
