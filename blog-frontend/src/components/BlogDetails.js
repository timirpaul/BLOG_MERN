import axios from "axios";
import React, { useEffect, useState } from "react"
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"

const labelStyles = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}


const BlogDetails = ()=>{
    const navigate = useNavigate()
    const [blog , setBlog] = useState()
    const id = useParams().id;
    const [inputs, setInput] = useState()
    const handleChange = (e) =>{
        setInput((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const fetchDetails = async () =>{
        const res = await axios.get(`http://localhost:5000/${id}`)
        .catch(err => console.log(err))
        console.log(res);
        const data = await res.data
        console.log(data);
        
        return data
    }
    useEffect(()=>{
        fetchDetails().then(data =>{
            setBlog(data)
            setInput({
                title:data.title,
                description:data.description,
                // img:data.img
            })
        })
    },[id])
    console.log(blog);

    const sendRequest = async ()=>{
        const res = await axios.put(`http://localhost:5000/update/${id}`,
        {
            title: inputs.title,
            description: inputs.description
        }
        ).catch(err=> console.log(err))

        const data = await res.data
        return data
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(inputs);
        sendRequest()
        .then(data=>console.log(data))
        .then(()=>navigate("/blogs/"))
    }
    
    return(
        <>
        {inputs && 
                <from onSubmit={handleSubmit} >
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
            }
        </>

    )
}

export default BlogDetails