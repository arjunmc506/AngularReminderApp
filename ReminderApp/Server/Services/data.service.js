const db=require('./db')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

  const login = (username, password) => {
    return db.User.findOne({username,password})
    .then(user=>{
        if(user){
            const token = jwt.sign({
                currentNo: username
            }, 'spersecretkey123123')
            return {
                statuscode: 200,
                status: true,
                message: "Login success",
                token,
                currentuser:user.username,
                _id:user._id
            }
        }
        else{
            return {
                statuscode: 422,
                status: false,
                message: "Invalid password"
            }
        }
    })
}

const addevent=(username,password,title,date)=>{
    let uno=uuidv4();
    return db.User.findOne({username,password})
    .then(user=>{
        if(!user){
            return {
                statuscode: 422,
                status: false,
                message: "invalid credentials"
            }
    }
    user.event.push({
        uid:uno,
        Title:title,
        Date:date
    })
    user.save()
        return {
            statuscode: 200,
            status: true,
            message:"Event added"
        }
    })
}

const getevents = (username) => {
    return db.User.findOne({username})
    .then(user=>{
        if(user){
            return {
                statuscode: 200,
                status: true,
                events: user.event
            }
        }
        else {
            return {
                statuscode: 422,
                status: false,
                message: "user not found"
            }

        }
    })   
}


const deleteEvent = (objectid,id)=>{
    return db.User.updateOne({
        _id: objectid
      }, {
        $pull: {
          event: {
            uid: id
          }
        }
      })
        .then(user=>{
            if(!user){
                return{
                    statuscode: 422,
                status: false,
                message: "invalid"
                }
            }
            else{
                return{
                    statuscode: 200,
                    status: true,
                    event:user.event,
                    message:"event removed"
                    
                }
            }
        })
    
}


const register = (username,password) => {

    return db.User.findOne({username})
        .then(user => {
            if (user) {
                return {
                    statuscode: 422,
                    status: false,
                    message: "User already exist"
                }
            }
            else {
                const newUser = new db.User({
                    username,
                    password,
                    event: []
                })
                newUser.save()
                return {
                    statuscode: 200,
                    status: true,
                    message: "Registration complete"
                }
            }
        })
}


  module.exports={
      login,
      addevent,
      getevents,
      register,
      deleteEvent,
  }