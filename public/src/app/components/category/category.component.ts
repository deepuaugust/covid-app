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
  columnDefs = [];
  rowData = [];
  gridApi = [];
  gridColumnApi = [];

  constructor(private _category: CategoryService, private route: Router, private toaster: ToasterService) {}

  ngOnInit() {
    this._category.list().subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else { 
        this.categories = res.data;
        this.columnDefs = [
          {
            headerName: "Category",
            field: "name",
            cellStyle: { border: "1px solid lightgrey" },
            sortable: true,
            filter: true,
          },
          {
            headerName: "Description",
            field: "description",
            cellStyle: { border: "1px solid lightgrey" },
          },
        ];
        this.rowData = this.categories;
      }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
}
