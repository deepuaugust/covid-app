import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RolesService } from "../../app.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles = [];

  constructor(private _roles: RolesService, private route: Router) {}

  ngOnInit() {
    this._roles.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else this.roles = res.data;
    });
  }
}
