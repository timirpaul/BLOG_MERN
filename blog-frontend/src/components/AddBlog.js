import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const labelStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}
const AddBlog = () => {
    const [inputs, setInput] = useState({
        title:"",
        description:"",
        img:""
    })
    const handleChange = (e) =>{
        setInput((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const sendRequest = async () =>{
        const res = await axios.post("http://localhost:5000/newblog",{
            title : inputs.title,
            description : inputs.description,
            img : inputs.img,
            userId : localStorage.getItem("userId")
        }).catch(err => console.log(err))
        
        const data = await res.data
        return data
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data => console.log(data))
    }
    return (
        <div>
            <from onClick={handleSubmit} >
                <Box 
                border={3} 
                borderColor="green" 
                borderRadius={10} 
                boxShadow="10 px 10px 20px #ccc" 
                padding={3}
                margin={'auto'} 
                marginTop={3} 
                display='flex'
                flexDirection={'column'}
                width={"80%"}
                >
                    <Typography
                        fontWeight={'bold'}
                        padding={3}
                        color="grey"
                        variant="h2"
                        textAlign={"center"}
                    >
                    Post Your Blog
                    </Typography>
                    <InputLabel  sx={labelStyles}>Title</InputLabel>
                    <TextField name="title" onChange={handleChange} value={inputs.title} />
                    <InputLabel  sx={labelStyles}>Description</InputLabel>
                    <TextField name="description" onChange={handleChange} value={inputs.description} />
                    <InputLabel  sx={labelStyles}>ImageURL</InputLabel>
                    <TextField name="img" onChange={handleChange} value={inputs.img} />
                    <Button 
                    sx={{mt:2,borderRadius:4}}
                    variant="contained"
                    color="warning"
                    type="submit"  >SUBMIT</Button>
                </Box>
            </from>
        </div>
    )
}

export default AddBlog