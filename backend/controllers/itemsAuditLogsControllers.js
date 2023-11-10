import AuditLogs from "../models/auditLogsModel.js";
import asyncHandler from "express-async-handler";

// Get all Items Logs
// route GET /api/itemLogs/
// @access Private
const getAllItemLogs = asyncHandler(async (req, res) => {
  const logs = await AuditLogs.find();
  if (logs) {
    res.status(200).json(logs);
  }
});

// Get all Items Logs
// route GET /api/itemLogs/deleteAll
// @access Private
const deleteAllItemLogs = asyncHandler(async (req, res) => {
  const deleted = await AuditLogs.deleteMany();
  if (deleted) {
    res.status(200).json(deleted);
  }
});

export {getAllItemLogs, deleteAllItemLogs};
