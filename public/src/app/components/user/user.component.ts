import { Component, OnInit } from '@angular/core';
import {UserService} from '../../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = {}

  constructor(private _user: UserService) { }

  ngOnInit() {
  }


}