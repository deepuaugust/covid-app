import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { CategoryService } from "../../app.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  categories = [];

  constructor(private _category: CategoryService, private route: Router) {}

  ngOnInit() {
    this._category.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.categories = res.data;
    });
  }
}
