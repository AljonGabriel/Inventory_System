import express from "express";
import {protect} from "../middleware/authMiddleware.js";

import {
  addItem,
  getItemData,
  getItemsCount,
  getItemThenUpdate,
  deleteItem,
} from "../controllers/itemControllers.js";

const router = express.Router();

router.post("/", protect, addItem);
router.get("/data", protect, getItemData);
router.get("/itemsCount", protect, getItemsCount);
router
  .route("/data/:id")
  .put(protect, getItemThenUpdate)
  .delete(protect, deleteItem);

export default router;
