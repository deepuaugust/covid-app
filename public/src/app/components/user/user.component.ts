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
  users = [];
  categories = [];
  filtered_users = [];
  selectedCategory: string;
  loggedInUser = JSON.parse(localStorage.getItem("user"));
  columnDefs = [];
  rowData = [];
  gridApi = [];
  gridColumnApi = [];

  constructor(
    private _users: UserService,
    private route: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    const type = this.loggedInUser.type === "admin" ? "regular" : "admin";
    this._users.listUrlByRole(type).subscribe((res) => {
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
        this.categories = Array.from(
          new Set(this.users.map((item) => item.category.name))
        );
        this.showUsers(this.users[0].category.name);
      }
    });
  }

  showUsers(category) {
    this.filtered_users = this.users.filter(
      (item) => item.category.name === category
    );
    this.selectedCategory = category;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
}
