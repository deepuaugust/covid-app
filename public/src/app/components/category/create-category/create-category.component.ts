import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterService } from "../../../services/toaster.service";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.css"],
})
export class CreateCategoryComponent implements OnInit {
  category = {};
  constructor(
    private _category: CategoryService,
    private route: Router,
    private toaster: ToasterService
  ) {}
  user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

  ngOnInit() {
    if(this.user.type === undefined) { 
      this.toaster.showError("Authentication Failed. Please login again.");
      this.route.navigate(['login']);
    }
  }

  create(data) {
    this._category.create(data).subscribe(
      (res) => {
        if (res.message == "success") this.route.navigate(["/category"]);
        else this.toaster.showError(res.message);
      },
      (error) => {
        this.toaster.showError(error.error.message);
        if (error.error.statusCode === 403) this.route.navigate(["login"]);
      }
    );
  }
}
