import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

const BlogCard = ({title,description,img,userId,isUser,id})=>{
  const navigate = useNavigate()
  console.log(title, isUser);
  const handleEdit = (e)=>{
  navigate(`myblogs/${id}`)
  }
    return(
        <>
        <Card sx={{ maxWidth: '40%',margin: 'auto',mt:2,padding:2,boxShadow:'5px 5px 10px #ccc', 
            ":hover":{boxShadow:'10px 20px 30px #ccc'} }}>
              {/* delete and update */}
          {isUser && (
            <Box display='flex'>
              <IconButton onClick={handleEdit} sx={{marginRight:"auto"}} >
                <EditIcon/>
              </IconButton> 

              <IconButton onClick={handleEdit} >
                <DeleteIcon/>
              </IconButton>
            </Box>
          )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
           {userId}
          </Avatar>
        }
        
        title ={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         <b> {userId} </b>
          {description}
        </Typography>
      </CardContent>
    </Card>
        </>
    )
}

export default BlogCard