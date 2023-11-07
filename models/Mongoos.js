const mongoose = require('mongoose')
mongoose.connect("mongodb://0.0.0.0:27017/NewSpace")
.then(()=>{
    console.log("db connected")
}).catch(()=>{
    console.log("not connected")
})
const LoginSchema=new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,  
        auto: true, 
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        required:true
    } 


})


const collection=new mongoose.model("LoginDetails",LoginSchema)
module.exports=collection












