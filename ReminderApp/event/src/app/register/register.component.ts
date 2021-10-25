import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z1-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder, private db:DataService,private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    var username=this.registerform.value.username
    var password=this.registerform.value.password
    if (this.registerform.valid) {
      
      this.db.register(username,password)
      .subscribe((result:any)=>{
        if (result) {
        alert(result.message)
        this.router.navigateByUrl("")
      }
    },
    (result)=>{
      alert(result.error.message)
    })
      
    }
    else {
      alert("invalid form")
    }
  }
  

}
