import { Component, OnInit } from "@angular/core";
import { ToasterService } from "src/app/services/toaster.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../../../assets/styles/rotating-card.css']
})
export class AdminComponent implements OnInit {
  user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

  constructor(private toaster: ToasterService, private route: Router) {}

  ngOnInit() {
    if(this.user.type === undefined) { 
      this.toaster.showError("Authentication Failed. Please login again.");
      this.route.navigate(['login']);
    }
  }

  login() {}
}
