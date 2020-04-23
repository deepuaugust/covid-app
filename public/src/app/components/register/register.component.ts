import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
    private _roles: RolesService
  ) {}

  loadCategories = () => {
    this._category.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.categories = res.data;
    });
  };

  onChange = (category) => {
    
    this._roles.getByCategory(category).subscribe((res) => {
      if (res.data == null) alert(res.message);
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
          alert("User registered successfully");
          this.route.navigate(["/login"]);
        } else alert(data.message);
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
}
