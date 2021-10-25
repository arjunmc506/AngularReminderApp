import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username=""
  password=""
  title=""
  date=""
  usname=""
  id=""
  input1=""

  user:any
  event:any
  uname:any
  
  
  constructor(private db:DataService, private router:Router) { 
    this.user=localStorage.getItem("currentuname")
    this.uname=localStorage.getItem("currentuname")
    this.db.getevent(this.uname)
    .subscribe((result:any)=>{
      if(result){
        this.event=result.events
      }
    },
    (result)=>{
      alert(result.error.message)
    }
    )
  }
  

  ngOnInit(): void {
  }
  addevent(){
    var username=localStorage.getItem("currentuname")
    var password=localStorage.getItem("currentpswd")
    var title=this.title
    var date=this.date
    this.db.addevent(username,password,title,date)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          window.location.reload();
        }
      },
        (result) => {
          alert(result.error.message)
        })


  
  }

  logout(){
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }

  delete(event:any){
    var id=event.currentTarget.attributes.id.value
    var objectid=localStorage.getItem("objectid") 
    this.db.deleteEvent(id,objectid).subscribe((result:any)=>{
      if(result){
        alert(result.message)
        window.location.reload();
      }
    })
  }

  edit(event:any){
    
    
  }
  
}
