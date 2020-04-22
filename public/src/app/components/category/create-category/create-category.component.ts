import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "../../../app.service";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.css"],
})
export class CreateCategoryComponent implements OnInit {
  category = {};
  constructor(private _category: CategoryService, private route: Router) {}
  ngOnInit() {}

  create(data) {
    this._category.create(data).subscribe((res) => {
      if (res.message == "success") this.route.navigate(["/category"]);
      else alert(res.message);
    });
  }
}
