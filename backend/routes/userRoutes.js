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
} = require("../controllers/user.controllers");
const upload = require("../middleware/multerConfig");

router.post("/create", createUser);

router.post("/signin", signin);
router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/", getAllUsers);
router.put("/update/:userId", upload.single("image"), updateUser);
router.get("/search", searchUser);
router.get("/:userId", getUserById);
router.delete("/:userId", deleteUserById);
router.delete("/", clearAllUsers);

module.exports = router;
