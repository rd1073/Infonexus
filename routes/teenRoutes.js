const express = require("express");

const { addService, getService, searchServices, viewAllServices} =require("../controllers/teensController");
 
const router = express.Router();



  
router.route("/add-service").post(addService);
router.route("/get-all-service").get(getService);
router.route("/view-all-service").get(viewAllServices);
router.route("/search-service").post(searchServices);


 



 
module.exports=  router ;