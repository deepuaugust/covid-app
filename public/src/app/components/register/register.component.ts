import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
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
  loggedInUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  heading = "";

  // type = this.loggedInUser.type === "admin" ? "regular" : "admin";

  type =
    this.loggedInUser !== ""
      ? this.loggedInUser.type === "admin"
        ? "regular"
        : "admin"
      : "";
  isEditMode = false;
  user = { type: this.type, status: true };
  roles = [];
  categories = [];
  private errorMessage: string;
  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private _user: UserService,
    private _category: CategoryService,
    private _roles: RolesService,
    private toaster: ToasterService
  ) {
    const { url } = this.route;
    if (url.indexOf("edit") > -1) this.isEditMode = true;
  }

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

  onChange = (category) => {
    this._roles.getByCategory(category).subscribe(
      (res) => {
        if (res.data == null) this.toaster.showError(res.message);
        else this.roles = res.data;
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  };

  ngOnInit() {
    this.loadCategories();
    this.loadData();
    this.heading = this.isEditMode ? "Edit" : "Create";
  }

  loadData() {
    if (this.isEditMode) {
      const id = this._route.snapshot.params["id"];
      this._user.getById(id).subscribe(
        (res) => {
          if (res.message == "success" && res.data[0]) {
            const [user] = res.data;
            this.user = user;
            this.onChange(user.category);
          } else this.toaster.showError(res.message);
        },
        (error) => {
          this.toaster.showError(error.error.message);
          if (error.error.statusCode === 403) this.route.navigate(["login"]);
        }
      );
    }
  }

  signup(data) {
    if (this.isEditMode) {
      this._user.update(data).subscribe(
        (data) => {
          if (data.status == "success") {
            this.toaster.showSuccess("User Updated successfully");
            this.route.navigate(["/user"]);
          } else this.toaster.showError(data.message);
        },
        (error) => {
          this.toaster.showError(error.error.message);
        }
      );
    } else {
      this._user.signup(data).subscribe(
        (data) => {
          if (data.status == "success") {
            this.toaster.showSuccess("User registered successfully");
            this.route.navigate(["/user"]);
          } else this.toaster.showError(data.message);
        },
        (error) => {
          this.toaster.showError(error.error.message);
          if (error.error.statusCode === 403) this.route.navigate(["login"]);
        }
      );
    }
  }
}
