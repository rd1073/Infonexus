require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const conn=require("./config/db")
const userRoutes=require("./routes/userRoutes")
const doctorRoutes=require("./routes/doctorRoutes")
const providerRoutes=require("./routes/providerRoutes")
const teenRoutes=require("./routes/teenRoutes")




const app = express();
app.use(express.json());

 
app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
app.use("/provider", providerRoutes);
app.use("/teen", teenRoutes);




 
app.listen(process.env.PORT,console.log(`Server running on 3000`));


 
 


 



 