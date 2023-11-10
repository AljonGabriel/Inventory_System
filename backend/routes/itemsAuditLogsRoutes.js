import express from "express";
import {protect} from "../middleware/authMiddleware.js";

import {
  getAllItemLogs,
  deleteAllItemLogs,
} from "../controllers/itemsAuditLogsControllers.js";

const router = express.Router();

router.get("/", protect, getAllItemLogs);
router.delete("/deleteAll", protect, deleteAllItemLogs);

export default router;
