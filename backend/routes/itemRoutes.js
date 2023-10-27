import express from "express";

import {addItem, getItemData} from "../controllers/itemControllers.js";

const router = express.Router();

router.post("/", addItem);
router.get("/data", getItemData);

export default router;
