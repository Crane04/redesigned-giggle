const Hospital = require('../models/hospitalModel');
const { sendEmail } = require('../utils/emailSender')
const jwt = require('jsonwebtoken');
require("dotenv").config()
const SECRET_KEY = process.env.SECRET_KEY
// Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    const { name, hospitalType, contactEmail, address } = req.body;

    // Check if any of the fields are empty
    if (!name || !hospitalType || !contactEmail || !address) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if a hospital with the same name already exists
    const hospitalByName = await Hospital.findOne({ name });
    if (hospitalByName) {
      return res.status(400).json({
        message: 'A hospital with this name already exists.',
      });
    }

    // Check if a hospital with the same contact email already exists
    const hospitalByEmail = await Hospital.findOne({ contactEmail });
    if (hospitalByEmail) {
      return res.status(400).json({
        message: 'A hospital with this contact email already exists.',
      });
    }

    // Generate a random 7-character regId
    const regId = Math.random().toString(36).substring(2, 9).toUpperCase();

    // Create the new hospital document
    const newHospital = new Hospital({
      name,
      regId,
      hospitalType,
      contactEmail,
      address,
    });

    // Save the new hospital to the database
    await newHospital.save();

    // Respond with success message and the new hospital data
    res.status(201).json({
      message: 'Hospital created successfully!',
      hospital: newHospital,
    });
  } catch (err) {
    // If there's an error, return a 500 status with the error message
    res.status(500).json({ message: 'Error creating hospital', error: err.message });
  }
};


exports.hospitalLogin = async (req, res) => {
  try {
    const { regId } = req.body;

    // Check if regId is provided
    if (!regId) {
      return res.status(400).json({ message: 'Registration ID is required.' });
    }

    // Find the hospital by regId
    const hospital = await Hospital.findOne({ regId });
    if (!hospital) {
      return res.status(401).json({ message: 'Invalid Registration ID.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { hospitalId: hospital._id, regId: hospital.regId }, // Payload
      SECRET_KEY, // Secret key
      { expiresIn: 999991000000000 } // Options
    );

    // Send the token and hospital details
    res.status(200).json({ message: 'Login successful', token, hospital });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

exports.verifyHospital = async (req, res) => {
  try {
    const { regId } = req.body;

    // Check if regId is provided
    if (!regId) {
      return res.status(400).json({ message: 'Registration ID is required.' });
    }

    // Find the hospital by regId
    const hospital = await Hospital.findOne({ regId });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found.' });
    }

    // Update the verified status to true
    hospital.verified = true;
    await hospital.save();

    res.status(200).json({ message: 'Hospital verified successfully.', hospital });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying hospital', error: err.message });
  }
};
// Get all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hospitals', error: err.message });
  }
};

// Get a hospital by registration ID
exports.getHospitalByRegId = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ regId: req.params.regId });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hospital', error: err.message });
  }
};

exports.clearAllHospitals = async (req, res) => {
  try {
    // Delete all documents in the Hospital collection
    await Hospital.deleteMany({});

    // Return a success message after clearing the hospitals
    res.status(200).json({ message: 'All hospitals have been cleared successfully.' });
  } catch (err) {
    // If there's an error, return a 500 status with the error message
    res.status(500).json({ message: 'Error clearing hospitals', error: err.message });
  }
};