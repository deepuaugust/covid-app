import { Component, OnInit } from "@angular/core";
import { UserService } from "../../app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  users = [];

  constructor(private _users: UserService, private route: Router) {}

  ngOnInit() {
    this._users.list("type", "regular").subscribe((res) => {
      if (res.data == null) alert(res.message);
      else {this.users = res.data;
      console.log(this.users)}
    });
  }
}
