import express from "express";
import {protect} from "../middleware/authMiddleware.js";

import {
  addItem,
  getItemData,
  getItemsCount,
  getItemThenUpdate,
  deleteItem,
  deleteMultipleData,
  exportItemsToExcel,
  getAuditlogs,
  getItemsChartData,
} from "../controllers/itemControllers.js";

const router = express.Router();

router.post("/", protect, addItem);
router.get("/data", protect, getItemData);
router.get("/itemsCount", protect, getItemsCount);
router
  .route("/data/:id")
  .put(protect, getItemThenUpdate)
  .delete(protect, deleteItem);

router.delete("/deleteMultipleData", deleteMultipleData);

router.get("/exportItemsToExcel", protect, exportItemsToExcel);
router.get("/audit", protect, getAuditlogs);
router.get("/audit/chart/", getItemsChartData);

export default router;
