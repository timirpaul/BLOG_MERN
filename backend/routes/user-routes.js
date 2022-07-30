const express =require('express')
const getAllUser = require('../controllers/user-controller')

const User = require('../model/User')
const bcrypt = require("bcryptjs") 

const router = express.Router()



router.get("/user",getAllUser)

router.post("/singup", async (req,res,next)=>{
    
    
    const {name,email,password}=req.body

    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        console.log(error);
    }
    if(existingUser){
       res.status(400).json({message:"User Already Exist!"})
    }
    const hsahpassword = bcrypt.hashSync(password)
    const user =new User({
        name,
        email,
        password:hsahpassword,
        blogs:[] //[]:blogs as a empty array for userSchema
    })
    
    try {
         
        await user.save()
        res.status(201).json({user})
        
    } catch (error) {
        
        console.log(error);
    }
})

router.post("/login",async (req,res,next)=>{
    const {email,password} =req.body
    let  existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (e) {
        console.log(e);
    }
    if(!existingUser){
        res.status(404).json({message: "User not found"})
        console.log("User not found")
    }
    const passwordCheck = bcrypt.compareSync(password,existingUser.password)
    if(!passwordCheck){
        res.status(404).json({message:"Password Not Match"})
    }

    res.status(200).json({message:"login successfull", user: existingUser})
    console.log("login");   

})

module.exports = router