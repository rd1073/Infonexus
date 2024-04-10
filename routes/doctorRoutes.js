const express = require("express");
const { addDoctor, getDoctors, searchDoctors, viewAllDoctors } = require("../controllers/doctorController");

const router = express.Router();

router.route("/add-doctor").post(addDoctor);
router.route("/get-all-doctors").get(getDoctors);
router.route("/view-all-doctors").get(viewAllDoctors);
router.route("/search-doctors").post(searchDoctors);

module.exports = router;
