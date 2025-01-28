const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    genotype: { type: String },
    bloodGroup: { type: String },
    disability: { type: String, default: null }, // Null if no disability
    previousHospitals: [
      {
        hospitalName: { type: String, required: true },
        dateVisited: { type: Date, default: Date.now }, // Default to current date
      },
    ],
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    image: {
      type: String, // URL to the image file stored in the server
      default: null, // Default to null if no image uploaded
    },
    additionalNotes: [
      {
        note: { type: String, required: true },
        date: { type: Date, default: Date.now }, // Default to current date
      },
    ],
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("User", userSchema);
