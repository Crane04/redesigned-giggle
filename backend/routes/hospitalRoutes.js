const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospital.controller");
const cloudinary = require("cloudinary").v2;
const upload = require("../middleware/multerConfig");
const axios = require("axios");

// Route to create a new hospital
router.post("/create", hospitalController.createHospital);

router.post("/login", hospitalController.hospitalLogin);
router.post("/verify", hospitalController.verifyHospital);

// Route to get all hospitals
router.get("/", hospitalController.getAllHospitals);

// Route to get a hospital by registration ID
router.get("/:regId", hospitalController.getHospitalByRegId);
router.delete("/", hospitalController.clearAllHospitals);

const User = require("../models/userModel");

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    // Get list of users with their usernames and images
    const users = await User.find({ image: { $ne: null } });
    const people = users.map((user) => ({
      name: user.username,
      image: user.image,
    }));

    // Return response object
    const data = {
      target_image: result.secure_url,
      people,
    };
    // return res.json(data);
    // Send request to mlURL/api/compare-images
    const response = await axios.post(
      "https://lifelink.pythonanywhere.com/api/compare-images/",
      data
    );

    // Check if matching names exist
    if (!response.data.results || !response.data.results.matching_names) {
      return res.status(404).json({ message: "No matching names found" });
    }

    // Get matching names from response
    const matchingNames = response.data.results.matching_names;

    try {
      // Get users for matching names
      const matchingUsers = await User.find({
        username: { $in: matchingNames },
      });

      // Return matching users
      res.status(200).json(matchingUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error finding matching users" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

module.exports = router;
