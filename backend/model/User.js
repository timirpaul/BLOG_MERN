const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require:true
        
    },
    password:{
        type:String,
        require:true,
        minlength:5
    }
    // blogs:[{
    //     type:mongoose.Types.ObjectId,
    //     ref:"Blog"
    // }]
})

const User = new mongoose.model("User",userSchema)

module.exports = User


