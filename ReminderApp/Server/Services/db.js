const mongoose= require("mongoose");

mongoose.connect('mongodb://localhost:27017/event',{
    useNewUrlParser:true
})

const User=mongoose.model('User',{
    username:String,
    password:String,
    event:[]
})
const Remainder=mongoose.model('Remainder',{
    username:String,
    password:String,
    event:[]
})
module.exports={
    User,
    Remainder
}