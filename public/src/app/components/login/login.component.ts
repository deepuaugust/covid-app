import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router'
import {UserService} from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {}

  constructor(private _user: UserService, private route: Router) { }

  ngOnInit() {
  }

  login(data){
    localStorage.setItem("token","")
    console.log(data);
    this._user.login(data).subscribe(res => {
      if(res.data == null){
        alert(res.message)
      }
      else {
      this._user.saveToken(res.data.jwtToken)    
      if (res.data.userDetails.type == "admin")
        this.route.navigate(['/admin_home'])
      else
        this.route.navigate([`/user/${res.data.userDetails._id}`])
      }
    });
  }

}