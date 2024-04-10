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
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String },
  location: { type: String },
  contactInfo: {
      phone: { type: String },
      address: { type: String }
  },
  accountStatus: { type: String, default: 'active' }
});

const User = conn.model('User', userSchema);



const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  specialization: { type: String, required: true },
  qualifications: String,
  experience: { type: Number, default: 0 },
  servicesOffered: [String],
  languagesSpoken: [String],
  affiliations: [String],
  technologicalCapabilities: [String],
  location: String,
  contactInfo: {
      phone: String,
      address: String
  }
});

const Doctor = conn.model('Doctor', doctorSchema);

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


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  tags: [{ type: String }],
  categories: [{ type: String }]
});

const Blog = conn.model('Blog', blogSchema);


module.exports = { conn , User, Doctor,Provider, Service, Blog};