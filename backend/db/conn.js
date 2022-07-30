const mongoose = require('mongoose')

const URL = "mongodb://localhost:27017/blogDB" 
mongoose.connect(URL).then(()=>{
    console.log(`DB connected `)
}).catch((e)=>{
    console.log(`DB error -> ${e}`);
})
