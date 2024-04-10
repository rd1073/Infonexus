const express = require("express");

const { Signup, Login } =require("../controllers/userController");
 
const router = express.Router();



  
router.route("/signup").post(Signup);
router.route("/login").post(Login);


 
module.exports=  router ;