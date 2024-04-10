const mongoose = require("mongoose")
require('dotenv').config();

const conn = mongoose.createConnection(process.env.DB_URI);
conn.on('connected', () => {
  console.log('Mongoose connected mongodb');
});
conn.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});


 


const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}, { timestamps: true });


const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  contact: {
      phone: String,
      email: String
  },
  qualifications: String,
  experience: Number,
  servicesOffered: [String],
  languagesSpoken: [String],
  affiliations: [String],
  technologicalCapabilities: [String]
});

const Doctor = conn.model('Doctor', doctorSchema);


const User = conn.model('User', userSchema);

const Provider = conn.model('Provider', providerSchema);

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Chronic Conditions', 'Virus Infections', 'Bacterial Infections', 'Genetic Conditions', 'HIV/AIDS (STI)'], required: true },
  serviceProviders: [String],
  cost: String,
  treatmentMethods: String,
  duration: String,
});

const Service = conn.model('Service', serviceSchema);



module.exports = { conn , User, Doctor,Provider, Service};