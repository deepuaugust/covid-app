import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cell_renderer",
  templateUrl: "./cell_renderer.component.html",
  styleUrls: ["./cell_renderer.component.css"],
})
export class CellRendererComponent implements OnInit {
  data: any;
  params: any;
  constructor() {}

  agInit(params) {
    this.params = params;
    this.data = params.data;
  }

  ngOnInit() {}

  alert1(msg) {
    alert(msg);
  }
}
