import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ToasterService } from "../../services/toaster.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  users = [];
  categories = [];
  filtered_users = [];
  selectedCategory: string;
  loggedInUser = JSON.parse(localStorage.getItem("user"));

  constructor(
    private _users: UserService,
    private route: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    const type = this.loggedInUser.type === "admin" ? "regular" : "admin";
    this._users.listUrlByRole(type).subscribe((res) => {
      if (res.data == null) this.toaster.showError(res.message);
      else {
        this.users = res.data;
        this.categories = Array.from(
          new Set(this.users.map((item) => item.category.name))
        );
        this.showUsers(this.users[0].category.name);
      }
    });
  }

  showUsers(category) {
    this.filtered_users = this.users.filter(
      (item) => item.category.name === category
    );
    this.selectedCategory = category;
  }
}
