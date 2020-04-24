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
  constructor(private _request: RequestService, private route: Router) {}

  ngOnInit() {
    this._request.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.requests = res.data;
    });
  }
}
