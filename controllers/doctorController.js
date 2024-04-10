const {signToken, protect} = require("../config/authMiddleware");
 
const { Doctor }=require("../config/db")

const bcrypt = require("bcrypt");

 


const addDoctor = async (req, res) => {
  try {
      const { doctorId, name, email, password, bio, specialization, qualifications, experience, servicesOffered, languagesSpoken, affiliations, technologicalCapabilities, location, contactInfo } = req.body;

      // Check if the doctor already exists
      const existingDoctor = await Doctor.findOne({ doctorId });
      if (existingDoctor) {
          return res.status(400).json({ message: 'Doctor already exists' });
      }

      // Create a new doctor
      const newDoctor = new Doctor({
        doctorId,
          name,
          email,
          password,
          bio,
          specialization,
          qualifications,
          experience,
          servicesOffered,
          languagesSpoken,
          affiliations,
          technologicalCapabilities,
          location,
          contactInfo
      });

      // Save the doctor to the database
      await newDoctor.save();

      res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).json({ message: 'Failed to add doctor' });
  }
};

const getDoctors = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.body;
      const skip = (page - 1) * limit;

      const count = await Doctor.countDocuments();
      const doctors = await Doctor.find()
          .skip(skip)
          .limit(limit);

      res.json({ count, page, pages: Math.ceil(count / limit), doctors });
  } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

const viewAllDoctors = async (req, res) => {
  try {
      const doctors = await Doctor.find();
      res.json(doctors);
  } catch (error) {
      console.error('Error fetching all doctors:', error);
      res.status(500).json({ message: 'Failed to fetch all doctors' });
  }
};

const searchDoctors = async (req, res) => {
  try {
      const { keyword, page = 1, limit = 2 } = req.body;
      const regex = new RegExp(keyword, 'i');

      const doctors = await Doctor.find({
          $or: [
              { name: regex },
              { specialization: regex },
              { location: regex },
              { qualifications: regex },
              { servicesOffered: { $in: [regex] } },
              { languagesSpoken: { $in: [regex] } },
              { affiliations: { $in: [regex] } },
              { technologicalCapabilities: { $in: [regex] } }
          ]
      });

      res.json(doctors);
  } catch (error) {
      console.error('Error searching for doctors:', error);
      res.status(500).json({ message: 'Failed to search for doctors' });
  }
};


  module.exports={ addDoctor, searchDoctors,getDoctors, viewAllDoctors}


 
