import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../../services/request.service";
import { ToasterService } from "../../services/toaster.service";
import { CellRendererComponent } from "../cell_renderer/cell_renderer.component";
import countries from "src/app/utils/countries.json";
import utils from "src/app/utils/utils.json";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"],
})
export class RequestsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));
  
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
    private route: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this._request.listByRole(this.user._id).subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else {
        this.requests = res.data;
        this.columnDefs = [
          { headerName: "Request", field: "title", cellStyle: {'border': '1px solid lightgrey'}},
          { headerName: "Description", field: "description", cellStyle: {'border': '1px solid lightgrey'} },
          {
            headerName: "Status",
            valueGetter: function(params){
              let status = utils.statuses.filter(item => item.value == params.data.status);
              return status[0].label;
            },
            sortable: true,
            filter: true,
            cellStyle: {'border': '1px solid lightgrey'},
          },
          {
            headerName: "Country",
            valueGetter: function(params){
              let country = countries.filter(item => item.code == params.data.country);
              return country[0].name;
            },
            sortable: true,
            filter: true,
            cellStyle: {'border': '1px solid lightgrey'},
          },
          {
            headerName: "Category",
            field: "category.name",
            sortable: true,
            filter: true,
            cellStyle: {'border': '1px solid lightgrey'}
          },
          {
            headerName: "Role",
            field: "role.name",
            sortable: true,
            filter: true,
            cellStyle: {'border': '1px solid lightgrey'}
          },
          {
            headerName: "Assigned To",
            valueGetter: function (params) {
              return params.data.assignedTo ? params.data.assignedTo.fName + " " + params.data.assignedTo.lName : '';
            },
            sortable: true,
            filter: true,
            cellStyle: {'border': '1px solid lightgrey'}
          },
          {
            headerName: "Actions",
            field: "action",
            cellRendererFramework: CellRendererComponent,
            cellStyle: {'border': '1px solid lightgrey'}
          },
        ];
        this.rowData = this.requests;
      }
    });
  }

  getitemFromList(key, value, list = [], valueKey) {
    const item = list.filter((d) => d[key] === value) || [];
    return item.length > 0 ? item[0][valueKey] : "";
  }
}
