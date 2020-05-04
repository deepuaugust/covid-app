import { Component, OnInit } from "@angular/core";
import { RolesService } from "../../../services/role.service";
import { CategoryService } from "../../../services/category.service";
import { Router } from "@angular/router";
import { ToasterService } from "../../../services/toaster.service";

@Component({
  selector: "app-create-roles",
  templateUrl: "./create-roles.component.html",
  styleUrls: ["./create-roles.component.css"],
})
export class CreateRolesComponent implements OnInit {
  role = {};
  categories = [];
  constructor(
    private _role: RolesService,
    private _category: CategoryService,
    private route: Router,
    private toaster: ToasterService
  ) {}

  loadCategories = () => {
    this._category.list().subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.categories = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  };

  ngOnInit() {
    this.loadCategories();
  }

  create(data) {
    this._role.create(data).subscribe(
      (res) => {
        if (res.code == 200) this.route.navigate(["/roles"]);
        else this.toaster.showError(res.message);
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  }
}
