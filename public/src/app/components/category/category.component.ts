import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterService } from "../../services/toaster.service";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  categories = [];

  constructor(private _category: CategoryService, private route: Router, private toaster: ToasterService) {}

  ngOnInit() {
    this._category.list().subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else this.categories = res.data;
    });
  }
}
