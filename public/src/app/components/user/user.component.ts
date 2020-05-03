import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ToasterService } from "../../services/toaster.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  users = [];
  categories = [];
  filtered_users = [];
  selectedCategory: string;
  loggedInUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  columnDefs = [];
  rowData = [];
  gridApi = [];
  gridColumnApi = [];
  heading = "";

  constructor(
    private _users: UserService,
    private route: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    const type = this.loggedInUser.type === "admin" ? "regular" : "admin";
    this.heading = type === "admin" ? "Admins" : "Volunteers";
    this._users.listUrlByRole(type).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else {
          this.users = res.data;
          this.columnDefs = [
            {
              headerName: "Name",
              valueGetter: function (params) {
                return params.data.fName + " " + params.data.lName;
              },
              cellStyle: { border: "1px solid lightgrey" },
              sortable: true,
              filter: true,
            },
            {
              headerName: "Category",
              field: "category.name",
              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },
            {
              headerName: "Role",
              field: "role.name",
              sortable: true,
              filter: true,
              cellStyle: { border: "1px solid lightgrey" },
            },
          ];
          this.rowData = this.users;
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
