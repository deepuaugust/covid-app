import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "../../services/request.service";
import { ToasterService } from "../../services/toaster.service";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.css"],
})
export class RequestsComponent implements OnInit {
  requests = [];
  categories = [];
  status = [];
  filtered_requests = [];
  selectedCategory: string;
  selectedStatus: string;
  constructor(private _request: RequestService, private route: Router, private toaster: ToasterService) {}

  ngOnInit() {
    this._request.list().subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else {
        this.requests = res.data;
        this.categories = Array.from(
          new Set(this.requests.map((item) => item.category.name))
        );
        this.showRequests(this.requests[0].category.name);
      }
    });
  }

  showRequests(category) {
    this.selectedCategory = category;
    this.status = Array.from(
      new Set(
        this.requests
          .filter((data) => data.category.name === category)
          .map((item) => item.status)
      )
    );
    this.showData(this.status[0]);
  }

  showData(status) {
    this.selectedStatus = status;
    this.filtered_requests = this.requests.filter(
      (item) =>
        item.category.name === this.selectedCategory && item.status === status
    );
  }
}
