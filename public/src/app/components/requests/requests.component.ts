import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../../app.service";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"],
})
export class RequestsComponent implements OnInit {
  requests = [];
  categories = [];
  filtered_requests = [];
  selectedCategory: string;
  constructor(private _request: RequestService, private route: Router) {}

  ngOnInit() {
    this._request.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else {
        this.requests = res.data;
        this.categories = Array.from(
          new Set(this.requests.map((item) => item.category.name))
        );
        this.showRequests(this.requests[0].category.name);
      }
    });
  }

  showRequests(category){
    this.filtered_requests = this.requests.filter(item => item.category.name === category);
    this.selectedCategory = category;
  }
}
