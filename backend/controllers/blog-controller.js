const Blog = require("../model/Blog");

const getAllBlog =async (req,res,next)=>{
    let blogs ;
    try {
       blogs= await Blog.find()
    } catch (e) {
        return console.log(e);
    } 
    if(!blogs){
        return res.status(404).json({message : "No blog Found"})
    }
    return res.status(201).json({blogs})
}



module.exports = getAllBlog