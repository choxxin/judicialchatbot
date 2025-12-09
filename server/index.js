require('dotenv').config()
const express=require('express')
const PORT=process.env.PORT || 3000
const app=express()
//cors setup for cross origin requests
const cors=require('cors')
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        secure: false
    }
))

//cookie parser
const cookiesParser=require('cookie-parser')
app.use(cookiesParser({
    secure: false,
    sameSite: 'lax'
}))


//enables parsing json response
app.use(express.json())


//api endpoints
const router=require('./routes/index.js')
app.use('/api',router)

//for deploying
const path=require('path');
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});


//db connection
const connectDB=require('./db/connectDb')
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`app running on http://localhost:${PORT}/`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})