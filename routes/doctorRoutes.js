const express = require("express");
const { addDoctor, getDoctors, searchDoctors, viewAllDoctors, getDoctorDetails } = require("../controllers/doctorController");

const router = express.Router();
const {protect}=require('../config/authMiddleware')



router.route("/add-doctor").post(addDoctor);
router.route("/get-all-doctors").get(getDoctors);
router.route("/view-all-doctors").get(viewAllDoctors);
router.route("/search-doctors").post(searchDoctors);
router.route("/get-doctor-details").get(protect,getDoctorDetails);

module.exports = router;
