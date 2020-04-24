import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {
  UserService,
  CategoryService,
  RolesService,
} from "src/app/app.service";

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
    private toastr: ToastrService
  ) {}

  loadCategories = () => {
    this._category.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.categories = res.data;
    });
  };

  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(msg) {
    this.toastr.error(msg);
  }

  onChange = (category) => {
    this._roles.getByCategory(category).subscribe((res) => {
      if (res.data == null) this.showError(res.message);
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
          this.showSuccess("User registered successfully");
          this.route.navigate(["/admin_home/user"]);
        } else this.showError(data.message);
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
}
