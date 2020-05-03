import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RolesService } from "../../services/role.service";
import { ToasterService } from "../../services/toaster.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"],
})
export class RolesComponent implements OnInit {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  roles = [];
  categories = [];
  filtered_roles = [];
  selectedCategory: string;
  columnDefs = [];
  rowData = [];
  gridApi = [];
  gridColumnApi = [];

  constructor(
    private _roles: RolesService,
    private route: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this._roles.list().subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else {
          this.roles = res.data;
          this.columnDefs = [
            {
              headerName: "Category",
              field: "category.name",
              cellStyle: { border: "1px solid lightgrey" },
              sortable: true,
              filter: true,
            },
            {
              headerName: "Role",
              field: "name",
              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Description",
              field: "description",
              cellStyle: { border: "1px solid lightgrey" },
            },
          ];
          this.rowData = this.roles;
        }
      },
      (error) => {
        this.toaster.showError(error.error.message);
        this.route.navigate(["login"]);
      }
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
}
