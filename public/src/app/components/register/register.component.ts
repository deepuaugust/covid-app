import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterService } from "../../services/toaster.service";
import { UserService } from "src/app/services/user.service";
import { CategoryService } from "src/app/services/category.service";
import { RolesService } from "src/app/services/role.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  user = { type: "regular" };
  roles = [];
  categories = [];
  private errorMessage: string;
  constructor(
    private route: Router,
    private _user: UserService,
    private _category: CategoryService,
    private _roles: RolesService,
    private toaster: ToasterService
  ) {}

  loadCategories = () => {
    this._category.list().subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else this.categories = res.data;
    });
  };

  onChange = (category) => {
    this._roles.getByCategory(category).subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else this.roles = res.data;
    });
  };

  ngOnInit() {
    this.loadCategories();
  }

  signup(data) {
    this._user.signup(data).subscribe(
      (data) => {
        if (data.status == "success") {
          this.toaster.showSuccess("User registered successfully");
          this.route.navigate(["/admin_home/user"]);
        } else this.toaster.showError(data.message);
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
}
