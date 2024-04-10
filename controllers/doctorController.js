const {signToken, protect} = require("../config/authMiddleware");
 
const { Doctor }=require("../config/db")

const bcrypt = require("bcrypt");

 
const addDoctor = async (req, res) => {
    try {
      const { doctorId,name, specialty, hospital, location, contact } = req.body;
  
      // Check if the doctor already exists
      const existingDoctor = await Doctor.findOne({ doctorId });
      if (existingDoctor) {
        return res.status(400).json({ message: 'Doctor already exists' });
      }
  
      // Create a new doctor
      const newDoctor = new Doctor({
        doctorId,
        name,
        specialty,
        hospital,
        location,
        contact
      });
  
      // Save the doctor to the database
      await newDoctor.save();
  
      res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
    } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).json({ message: 'Failed to add doctor' });
    }
  };


  const searchDoctor = async (req, res) => {
    try {
      const { page =1, limit = 2 } = req.body;
      let query = {};
  
      // If search criteria are provided in the request body
      if (req.body.search) {
        query.name = { $regex: req.body.search, $options: 'i' };
      }
  
      // Calculate the skip value for pagination
      const skip = (page - 1) * limit;
  
      // Execute the query with pagination and get total count
      const doctors = await Doctor.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .exec();
      const totalCount = await Doctor.countDocuments(query);
  
      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limit);
  
      res.status(200).json({
        doctors,
        totalPages,
        currentPage: parseInt(page),
        totalCount
      });
    } catch (error) {
      console.error('Error searching doctors:', error);
      res.status(500).json({ message: 'Failed to search doctors' });
    }
  };

  module.exports={ addDoctor, searchDoctor}


 
