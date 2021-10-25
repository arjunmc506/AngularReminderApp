import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const options={
  withCredential:true,
  headers:new HttpHeaders
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentuser=""


  constructor(private http:HttpClient,private router:Router) { }

  login(username:any,password:any){
    const data={
      username,
      password
    }
    return this.http.post("http://localhost:3000/login",data)
  }

  register(username:any,password:any){
    const data={
      username,
      password
    }
    return this.http.post("http://localhost:3000/register",data)
  }
  getoptions(){
    const token=localStorage.getItem("token")
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers
    }
    return options
  }

  addevent(username:any,password:any,title:any,date:any){
    const data={
      username,
      password,
      title,
      date
    }
    return this.http.post("http://localhost:3000/addevent",data,this.getoptions())
  }
  getevent(username:any){
    const data={
      username
    }
    return this.http.post("http://localhost:3000/event",data,this.getoptions())
  }

  deleteEvent(id:any,objectid:any){
    const data={
      id,
      objectid
    }
    return this.http.post("http://localhost:3000/deleteevent",data,this.getoptions())
  }

  
}

