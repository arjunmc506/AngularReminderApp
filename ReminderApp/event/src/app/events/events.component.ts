import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  event:any
  uname:any
  constructor(private db:DataService) {
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

}
