import React ,{ useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../store/redux";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [input, setInput] = useState({
        name:"",email:"",password:""
    })
    const [isSignup, setIsSignup] = useState(false)
    
    
    const handleInputChange = (e)=>{
        setInput((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const sendRequest = async (type="login")=>{
       try {
        const url = `http://localhost:5000/${type}`
        const res = await axios.post( url,{
            name:input.name,
            email:input.email,
            password: input.password
        })
        const resdata = await res.data //data => data from backend response jsondata
        // console.log(resdata.user._id);
        return resdata
    } catch (e) {
        console.log(`err => ${e}`);
    }
}


const handleSubmit= (e)=>{
    e.preventDefault()
    console.log(input);
    if(isSignup){
        sendRequest("singup")
        .then((resdata)=> localStorage.setItem("userId",resdata.user._id))
        .then(()=>dispath(authActions.login()))
        .then(()=>navigate("/auth"))
        .then(resdata=>console.log(resdata))
    } else{
        sendRequest()
        .then((resdata)=> localStorage.setItem("userId",resdata.user._id))
        .then(()=>dispath(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then(resdata=>console.log(resdata))
    }
    console.log(sendRequest());
}


return(
       
            <div>
                <form onSubmit={handleSubmit} >
                    <Box 
                    maxWidth={400}
                    display="flex"
                    flexDirection={'column'} 
                    alignItems='center'
                    justifyContent={'center'}
                    boxShadow="10px 10px 20px #acc"
                    padding={3}
                    margin='auto'
                    marginTop={5}
                    borderRadius={5}
                    >
                        <Typography variant="h2"
                        padding={3}
                        textAlign="center"
                        >{!isSignup ? "Login" : "Signup"}</Typography>
                        { isSignup && 
                        <TextField
                        name="name"
                        onChange={handleInputChange} 
                        value={input.name} 
                        type={"Name"} 
                        placeholder="Name" 
                        margin="normal"/>
                        }
                        <TextField
                        name="email" 
                        onChange={handleInputChange}
                        value={input.email} 
                        type={"email"} 
                        placeholder="Email" 
                        margin="normal"/>

                        <TextField
                        name="password" 
                        onChange={handleInputChange}
                        value={input.password} 
                        type={"password"} 
                        placeholder="Password" 
                        margin="normal"/>

                        <Button
                        type="submit" 
                        variant="contained" 
                        sx={{borderRadius:3 , marginTop:3}} 
                        color="warning" 
                        >Submit</Button>
                       
                        <Button 
                        onClick={ ()=> setIsSignup(!isSignup)} 
                        sx={{borderRadius:3 , marginTop:3}} >Change To {isSignup ? "Login" : "Signup"}</Button>
                        
                    </Box>
                </form>
            </div>
       
    )
}

export default Login