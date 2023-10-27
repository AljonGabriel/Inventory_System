import express from "express";

import {
  addItem,
  getItemData,
  getItemThenUpdate,
  deleteItem,
} from "../controllers/itemControllers.js";

const router = express.Router();

router.post("/", addItem);
router.get("/data", getItemData);
router.route("/data/:id").put(getItemThenUpdate).delete(deleteItem);

export default router;
