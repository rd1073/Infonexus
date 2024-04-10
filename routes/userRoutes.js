const express = require("express");

const { registerUser, Login , getUserDetails} =require("../controllers/userController");
 
const router = express.Router();

const {protect}=require('../config/authMiddleware')


  
router.route("/register").post(registerUser);
router.route("/login").post(Login);
router.route("/get-user-details").get(protect,getUserDetails);



 
module.exports=  router ;