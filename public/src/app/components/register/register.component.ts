import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router'
import { UserService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {}
  private errorMessage:string
  constructor(private route:Router, private _user: UserService) { }

  ngOnInit() {
  }

  signup(data){
    this._user.signup(data).subscribe(token => {
      console.log(token);
      if(token.data!=null){
        alert("User registered successfully");
        this.route.navigate(['/login']) 
      }
      else{
        alert(token.message)
      }   
    },
    error => this.errorMessage = < any > error);
  }

}