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
  categories = [];
  filtered_roles = [];
  selectedCategory: string;

  constructor(private _roles: RolesService, private route: Router) {}

  ngOnInit() {
    this._roles.list().subscribe((res) => {
      if (res.data == null) alert(res.message);
      else { 
        this.roles = res.data;
        this.categories = Array.from(
          new Set(this.roles.map((item) => item.category.name))
        );
        this.showRoles(this.roles[0].category.name);
      }
    });
  }

  showRoles(category){
    this.filtered_roles = this.roles.filter(item => item.category.name === category);
    this.selectedCategory = category;
  }
}
