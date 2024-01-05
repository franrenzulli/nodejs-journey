const express = require("express")
const app = express() 
const dittoJSON = require('C:\\Users\\54342\\Desktop\\Programacion\\express\\api\\ditto.json')

const PORT = process.env.PORT ?? 1234

app.use((req,res,next)=>{

    console.log("My first middlware")
    // here we can check if a user has cookies, track a request to the database or anything
    if(req.method != "POST") return next()
    if(req.headers["content-type"] != "application/json") return next()

// Only POST requests with "application/json" headers arrive

    let body = " "

    req.on("data", chunk => { 
        body += chunk.toString() 
    })

    req.on("end", ()=>{ 
        const data = JSON.parse(body)
        // put the info in the req.body
        req.body = data
        next()
    })
})

app.get("/", (req, res)=>{ // When the app receives a get method...
    res.json(ditto)
})

app.post("/pokemon", (req, res)=>{

    res.status(201).json(req.body)

})

app.use((req,res)=>{ // It doesnt matter if it is a POST or GET Method. 
    res.status(404).send("<h1>404</h1>")
})


app.listen(PORT, ()=>{
    console.log("Server listening on port 1234")
})
