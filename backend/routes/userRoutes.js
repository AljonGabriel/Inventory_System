import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getIDandUpdate,
  deleteUser,
} from "../controllers/userControllers.js";
import {protect} from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get("/getAll", protect, getAllUsers);

router.put("/getIDandUpdate/:id", protect, getIDandUpdate);

router.delete("/delete/:id", protect, deleteUser);

export default router;
