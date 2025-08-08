


const express=require("express");
const mongoose =require("mongoose");
const app =express();
app.use (express.json());


//env
require('dotenv').config()
const port =process.env.PORT
const mongourl=process.env.MONGODB_URL
mongoose.connect(mongourl).then(()=>{
     console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
})


const routeuser =require('./routers/user')
app.use("/Users",routeuser);

const routeEnrollment =require('./routers/Enrollment')
app.use("/Enrollments",routeEnrollment);



app.listen(port ,()=>{
    console.log ('server is running')
})