const express = require("express")
const blogRouter = require("./routes/blog-routes")

const router = require("./routes/user-routes")
const cors = require("cors")


const PORT = process.env.PORT || 5000
require("./db/conn")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("okk")
})

app.use("/",router)
app.use("/",blogRouter)


app.listen(PORT,()=>{
    console.log(`lis ${PORT}`);
})