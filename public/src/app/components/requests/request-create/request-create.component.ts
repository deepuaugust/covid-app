import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import {
  UserService,
  CategoryService,
  RolesService,
  RequestService,
} from "src/app/app.service";

@Component({
  selector: "app-request-create",
  templateUrl: "./request-create.component.html",
  styleUrls: ["./request-create.component.css"],
})
export class RequestCreateComponent implements OnInit {
  request = {};
  categories = [];
  roles = [];
  users = [];
  statuses = [
    { label: "New", value: 1 },
    { label: "In progress", value: 2 },
    { label: "Resolved", value: 3 },
  ];

  constructor(
    private route: Router,
    private _user: UserService,
    private _category: CategoryService,
    private _roles: RolesService,
    private _request: RequestService
  ) {}

  loadCategories = () => {
    this._category.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.categories = res.data;
    });
  };

  onCategoryChange = (category) => {
    this.roles = [];
    this.request['role'] = '';
    this.request['assignedTo'] = '';
    this._roles.getByCategory(category).subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.roles = res.data;
    });
  };

  onRoleChange = (role) => {
    this.users = [];
    this.request['assignedTo'] = '';
    const query = { type: "regular", role };
    this._user.dynamicList(query).subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.users = res.data;
    });
  };

  ngOnInit() {
    this.loadCategories();
  }

  createRequest = (request) => {
    this._request.create(request).subscribe((res) => {
      if (res.message == "success") this.route.navigate(["/requests"]);
      else alert(res.message);
    });
  };
}
