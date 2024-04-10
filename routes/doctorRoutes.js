const express = require("express");

const { addDoctor, searchDoctor } =require("../controllers/doctorController");
 
const router = express.Router();



  
router.route("/add-doctor").post(addDoctor);
router.route("/search-doctor").post(searchDoctor);




 
module.exports=  router ;