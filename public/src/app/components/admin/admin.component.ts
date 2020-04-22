import { Component, OnInit } from '@angular/core';
import {UserService} from '../../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user = {}

  constructor(private _user: UserService) { }

  ngOnInit() {
  }

  login(data){
    localStorage.setItem("token","")
    console.log(data);
    this._user.login(data);
  }

}