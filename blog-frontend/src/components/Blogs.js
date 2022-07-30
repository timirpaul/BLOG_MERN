import React , { useEffect , useState} from "react";
import axios from 'axios'
import BlogCard from "./BlogCard";

const Blogs = ()=>{
    const [blogs, setBlogs] = useState()
    const sendRequest = async ()=>{
        const res = await axios.get("http://localhost:5000/blog")
        .catch((e)=>console.log(e))
        const resdata = await res.data
        return resdata
    }
    useEffect(() => {
        sendRequest().then(resdata => setBlogs(resdata.blogs))
    }, [])
    console.log(blogs);



    return (
        <>
        
            
            {blogs && 
                blogs.map((blog,index)=>(
                <BlogCard 
                id={blog._id}
                isUser={localStorage.getItem("userId")===blog.userId}
                title={blog.title} 
                description={blog.description} 
                img={blog.img} 
                userId={blog.userId}  />
                ))
            }
            
        </>
    )
}

export default Blogs