import { Component, OnInit } from "@angular/core";
import { RolesService, CategoryService } from "../../../app.service";
import { Router } from "@angular/router";

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
    private route: Router
  ) {}

  loadCategories = () => {
    this._category.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.categories = res.data;
    });
  };

  ngOnInit() {
    this.loadCategories()
  }

  create(data) {
    this._role.create(data).subscribe((res) => {
      if (res.code ==200) this.route.navigate(["/roles"]);
      else alert(res.message);
    });
  }
}
