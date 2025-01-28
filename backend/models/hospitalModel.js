const mongoose = require('mongoose');

// Define the Hospital schema
const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The name is required
    unique: true
  },
  regId: {
    type: String,
    unique: true,  
  },
  hospitalType: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true, // Contact email is required
    match: [/.+\@.+\..+/i, 'Please provide a valid email address'],
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true, 
});

// Create the model from the schema
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
