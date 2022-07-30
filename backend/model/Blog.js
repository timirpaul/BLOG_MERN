const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
        
    }
})


const Blog = new mongoose.model("Blog",blogSchema)

module.exports =Blog