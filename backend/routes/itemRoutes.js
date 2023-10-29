import express from "express";
import {protect} from "../middleware/authMiddleware.js";

import {
  addItem,
  getItemData,
  getItemThenUpdate,
  deleteItem,
} from "../controllers/itemControllers.js";

const router = express.Router();

router.post("/", protect, addItem);
router.get("/data", protect, getItemData);
router
  .route("/data/:id")
  .put(protect, getItemThenUpdate)
  .delete(protect, deleteItem);

export default router;
