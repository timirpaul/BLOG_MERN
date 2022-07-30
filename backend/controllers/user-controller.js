const User = require('../model/User')

const getAllUser = async (req,res,next)=>{
    let users;
    try {
        users = await User.find()
        console.log(users)
        
    } catch (error) {
        console.log(`err -> ${error}`)
    }
    if(!users){
        return res.status(404).json({message : "No user Found"})
    }
    return res.status(200).json({users})
}



 module.exports = getAllUser