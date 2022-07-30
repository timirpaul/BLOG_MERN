import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserBlog = ()=>{
    const [email, setEmail]= useState()
    const [name, setName]= useState()
    const id = localStorage.getItem("userId")
    const sendRequest = async ()=>{
        const res = await axios.get(`http://localhost:5000/user/${id}`)
        .catch(err=>console.log(err))
        const data = await res.data
        console.log(data);
        return data
    }
    useEffect(()=>{ 
        sendRequest().then((data)=>setEmail(data.email)) 
        sendRequest().then((data)=>setName(data.name)) 
    })
    console.log(email);
    console.log(name);
    
    return(
        <>
        
        <div>
            <Typography>User ID : {id}</Typography>
            <Typography>User Name : {name}</Typography>
            <Typography>User Email : {email}</Typography>
        </div>
        </>
    )
}

export default UserBlog