const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"]
}))

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(3000,()=>{
    console.log("Server Running");
})