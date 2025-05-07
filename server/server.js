import express from "express"

const app = express()

app.get("/",(req,res)=>{
    res.send("kya hal hai bidu log ")
})

app.listen(8000,()=>console.log("Server have start"))