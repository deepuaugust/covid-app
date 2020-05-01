import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../../../assets/styles/rotating-card.css']
})
export class AdminComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("user"));

  constructor() {}

  ngOnInit() {}

  login() {}
}
