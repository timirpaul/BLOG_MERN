import React from "react";
import {AppBar, Button, Toolbar,Typography,Box,Tabs,Tab} from '@mui/material'
import { useState } from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/redux";

const Header = ()=>{
    const dispath = useDispatch()

    const isLoggedIn = useSelector((state)=>state.isLoggedIn)
    

    const [value,setValue] = useState()


    

    return(
        <AppBar position ="sticky">
            <Toolbar>
                <Typography  variant= 'h4'>BlogsApp</Typography>
                { isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                    <Tabs
                        textColor="inherit"   
                        value={value} 
                        onChange={(e,val)=>setValue(val)}>
                            <Tab LinkComponent={Link} to="/" label="HOME"/>
                            <Tab LinkComponent={Link} to="/blogs" label="AllBlogs"/>
                            <Tab LinkComponent={Link} to="/myblogs" label="Profile"/>
                            <Tab LinkComponent={Link} to="/blogs/add" label="AddBlog"/>
                    </Tabs>
                </Box>}
                <Box display="flex" marginLeft='auto'>
                    {!isLoggedIn &&
                        <> 
                        <Button 
                        LinkComponent={Link} to="/auth" 
                        variant='contained' 
                        sx={{margin:1, borderRadius:10}} 
                        color="warning">Login / Signup</Button>

                        <Button 
                        LinkComponent={Link} to="/auth" 
                        variant='contained' 
                        sx={{margin:1, borderRadius:10}} 
                        color="warning">Signup</Button> 
                        </>
                    }
                    { isLoggedIn && 
                        <Button 
                            onClick={()=>dispath(authActions.logout())}
                            LinkComponent={Link} to="/auth" 
                            variant='contained' 
                            sx={{margin:1, borderRadius:10}} 
                            color="warning">Logout</Button>
                    }
                </Box>
            </Toolbar> 
        </AppBar>
    )
}

export default Header