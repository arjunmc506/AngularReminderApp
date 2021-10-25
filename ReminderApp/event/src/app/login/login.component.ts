import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = ""
  password = ""

  loginform = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb: FormBuilder, private db: DataService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    var username = this.loginform.value.username
    var password = this.loginform.value.password

    if (this.loginform.valid) {
      this.db.login(username, password)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem("token",result.token)
            localStorage.setItem("currentuname",username)
            localStorage.setItem("currentpswd",password)
            localStorage.setItem("objectid",result._id)
           
            this.router.navigateByUrl("dashboard")
            console.log(result);
            
          }
        },
          (result) => {
            alert(result.error.message);
          }
        )
    }
    else {
      alert("invalid form")
    }
  }
}