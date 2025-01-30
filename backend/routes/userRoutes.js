const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  searchUser,
  getUserById,
  deleteUserById,
  clearAllUsers,
  signin,
  uploadImage,
  getUser,
  updateUserByUser,
} = require("../controllers/user.controllers");
const upload = require("../middleware/multerConfig");
const User = require("../models/userModel");

router.post("/create", createUser);
router.get("/get-user", getUser);
router.put("/update-user-by-user", updateUserByUser);

router.post("/signin", signin);
router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/", getAllUsers);
router.put("/update/:userId", upload.single("image"), updateUser);
router.get("/search", searchUser);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUserById);
router.delete("/", clearAllUsers);
router.delete("/users/:username", async (req, res) => {
  const username = req.params.username;

  try {
    // Find all users with the same username
    const users = await User.find({ username });

    // If there's only one user, return an error
    if (users.length <= 1) {
      return res
        .status(400)
        .send({ message: "Cannot delete last user with this username" });
    }

    // Delete all users except the first one
    await User.deleteMany({
      _id: { $in: users.slice(1).map((user) => user._id) },
    });

    res.send({ message: "Users deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting users" });
  }
});

module.exports = router;
