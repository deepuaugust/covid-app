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
    this._request.list().subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else {
        this.requests = res.data;
        this.columnDefs = [
          { headerName: "Request", field: "title", headerClass: "header-div", cellStyle: {'border': '1px solid lightgrey'}},
          { headerName: "Description", field: "description", cellStyle: {'border': '1px solid lightgrey'} },
          {
            headerName: "Status",
            field: "status",
            headerClass: "header-div",
            sortable: true,
            filter: true,
            cellStyle: {'border': '1px solid lightgrey'},
          },
          {
            headerName: "Country",
            field: "country",
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
              return params.data.assignedTo.fName + " " + params.data.assignedTo.lName;
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
        this.categories = Array.from(
          new Set(this.requests.map((item) => item.category.name))
        );
        this.requests.length > 0
          ? this.showRequests(this.requests[0].category.name)
          : "";
      }
    });
  }

  showRequests(category) {
    this.selectedCategory = category;
    this.status = Array.from(
      new Set(
        this.requests
          .filter((data) => data.category.name === category)
          .map((item) => item.status)
      )
    );
    this.showData(this.status[0]);
  }

  showData(status) {
    this.selectedStatus = status;
    this.filtered_requests = this.requests.filter(
      (item) =>
        item.category.name === this.selectedCategory && item.status === status
    );
  }

  getitemFromList(key, value, list = [], valueKey) {
    const item = list.filter((d) => d[key] === value) || [];
    return item.length > 0 ? item[0][valueKey] : "";
  }
}
