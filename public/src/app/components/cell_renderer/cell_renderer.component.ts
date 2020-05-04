import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cell_renderer",
  templateUrl: "./cell_renderer.component.html",
  styleUrls: ["./cell_renderer.component.css"],
})
export class CellRendererComponent implements OnInit {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  readAccess = this.user.role && this.user.role.requestReadAccess;
  data: any;
  params: any;
  constructor() {}

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }

  ngOnInit() {}
}
