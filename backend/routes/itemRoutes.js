import express from "express";

import {addItem} from "../controllers/itemControllers.js";

const router = express.Router();

router.post("/", addItem);

export default router;
