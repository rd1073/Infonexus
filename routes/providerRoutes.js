const express = require("express");

const { addProvider, getProviders, searchProviders, viewAllProviders, updateProvider} =require("../controllers/providerCoontroller");
 
const router = express.Router();



  
router.route("/add-provider").post(addProvider);
router.route("/get-all-provider").get(getProviders);
router.route("/view-all-provider").get(getProviders);
router.route("/search-provider").post(searchProviders);
router.route("/update-provider").post(updateProvider);

 



 
module.exports=  router ;