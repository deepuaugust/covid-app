import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../../../services/request.service";
import { ToasterService } from "../../../services/toaster.service";
import { RequestCellRendererComponent } from "../../cell_renderer/requestCellRenderer/cell_renderer.component";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";

@Component({
  selector: "app-requests",
  templateUrl: "./requests-nonmedical.component.html",
  styleUrls: ["./requests-nonmedical.component.css"],
})
export class RequestsNonMedicalComponent implements OnInit {
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
          console.log(this.requests);
          this.columnDefs = [
            {
              headerName: "Token #",
              field: "token",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Country of residence",
              // valueGetter: function (params) {
              //   let country = countries.filter(
              //     (item) => item.code == params.data.country
              //   );
              //   return country[0].name;
              // },
              field: "currentCountry",

              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Full Name",
              field: "fullName",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Whatsapp Contact Number",
              field: "phoneNumber",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Phone Contact Number",
              field: "contactPhone",
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
              headerName: "Support Requested",
              field: "supportRequested",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Support Requested For",
              field: "supportRequiredFor",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Person to be contacted",
              field: "contactFullName",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Flat No / House No / House Name",
              field: "houseNumber",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Apartments / Local Area / Street / Road",
              field: "area",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Landmark & Post Office",
              field: "landmark",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "District / City",
              field: "district",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Pin or Postal Code",
              field: "postal",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "EMAIL Address",
              field: "email",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Status",
              field: "status",
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Forwarded To",
              field: "assignedTo",
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
