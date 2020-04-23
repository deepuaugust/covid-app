import { Component, OnInit } from "@angular/core";
import {  Router } from "@angular/router";
import { UserService, CategoryService } from "src/app/app.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  user = { type: "regular" };
  categories = {};
  private errorMessage: string;
  constructor(
    private route: Router,
    private _user: UserService,
    private _category: CategoryService
  ) {}

  loadCategories = () => {
    this._category.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.categories = res.data;
    });
  };

  ngOnInit() {
    this.loadCategories();
  }

  signup(data) {
    console.log(data);
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
