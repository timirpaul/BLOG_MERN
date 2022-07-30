const express = require('express')
const mongoose = require('mongoose')
const getAllBlog  = require('../controllers/blog-controller')

const Blog = require('../model/Blog')
const User = require('../model/User')

const blogRouter = express.Router()

blogRouter.get("/blog",getAllBlog)


blogRouter.post("/newblog",async(req,res,next)=>{
    const {title,description,img,userId} =req.body
    let existingUser;
    // console.log(user);
    const blog = new Blog({
        title,
        description,
        img,
        userId
    })
    console.log(blog);
    
    try {
        existingUser = await User.findById(userId)
        
        if(!existingUser){
            res.status(404).json({message:"Unable To Find User By Id"})
        }
        await blog.save()
        
        // const session = await mongoose.startSession()
        // session.startTransaction()
        // await blog.save({session}) 
        // existingUser.blogs.push(blog)
        // await existingUser.save({session})
        // await session.commitTransaction()

        res.status(200).json({blog})
    } catch (e) {
                
        console.log(`err ${e}`);
    }

})
blogRouter.get("/:id",async (req,res,next)=>{
    const id = req.params.id
    let blog;
    try {
        blog =await Blog.findById(id)
        if(!blog){
            res.status(404).json({message:"No Blog Found"})
        }
        res.status(200).json(blog)
    } catch (e) {
        console.log(e);
    }
})
blogRouter.get("/user/:id",async (req,res,next)=>{
    const id = req.params.id
    let user;
    try {
        user =await User.findById(id)
        if(!user){
            res.status(404).json({message:"No user Found"})
        }
        res.status(200).json(user)
    } catch (e) {
        console.log(e);
    }
})

blogRouter.put("/update/:id",async (req,res,next)=>{
    const {title,description} =req.body
    const blogId = req.params.id
    
    try {
        
        const updateBlog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
        if(!updateBlog ){
            res.status(500).json({message:'Unable To Update The Blog'})
        }
        res.status(201).json({updateBlog})
        
    } catch (e) {
        console.log(e);
    }
})

blogRouter.delete("/:id",async(req,res,next)=>{
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id)
        if(!blog){
            res.status(404).json({message:"unable to delete"})
        }
        res.status(200).json({message:"Delete Succesfully"})
    } catch (e) {
        console.log(e);
    }
})

module.exports = blogRouter