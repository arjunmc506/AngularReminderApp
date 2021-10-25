const express=require('express')
const app=express()
const dataservice=require('./Services/data.service')
app.use(express.json())
const session=require("express-session")
const jwt=require('jsonwebtoken')
const cors=require('cors')
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use(session({
    secret:'randomsecretkey',
    resave:false,
    saveUninitialized:false
}))
app.use((req,res,next)=>{
    console.log("middleware");
    next()
})
const jwtmiddleware=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
    const data=jwt.verify(token,'spersecretkey123123')
    req.currentacc=data.currentNo
    next()
    }
    catch{
        const result=({
            statuscode: 401,
            status: false,
            message: "Please login"
        })
        res.status(result.statuscode).json(result)
    }
}




app.post('/login',(req,res)=>{
    dataservice.login(req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
    
})
app.post('/addevent',jwtmiddleware,(req,res)=>{
    dataservice.addevent(req.body.username,req.body.password,req.body.title,req.body.date)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })  
})
app.post('/event',jwtmiddleware,(req,res)=>{
    dataservice.getevents(req.body.username)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
   
})
app.post('/register',(req,res)=>{
    dataservice.register(req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

app.post('/deleteevent',jwtmiddleware,(req,res)=>{
    dataservice.deleteEvent(req.body.objectid,req.body.id)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
   
})


app.listen(3000,()=>{
    console.log("server running");
})
