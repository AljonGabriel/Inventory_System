import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import {incrementItemsCount} from "../utils/itemsChartHandler.js";
import AuditLogs from "../models/auditLogsModel.js";
import ItemsChart from "../models/itemsChartModel.js";
import ExcelJS from "exceljs";
import fs from "fs";
import {log} from "console";

// @desc Add item
// route GET /api/items/
// @access Private
const addItem = asyncHandler(async (req, res) => {
  const {iName, iDescription, category, stocks, addedBy} = req.body;

  let errors = {};

  if (!iName) {
    errors.iName = "Please enter the Item name";
  }

  if (!iDescription) {
    errors.iDescription = "Description is required";
  }

  if (!category) {
    errors.category = "Please specify the category";
  }

  if (!stocks) {
    errors.stocks = "Enter quantity";
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  // Convert stocks to a number
  const stocksNumber = parseInt(stocks, 10); // Assuming it's an integer

  const existingItem = await Item.findOne({
    itemName: iName,
    itemDescription: iDescription,
    category: category,
  });

  if (existingItem) {
    // If it exists, update the quantity by adding the new stocks
    existingItem.quantity += stocksNumber;

    const newLogEntry = new AuditLogs({
      action: "Quantity adjustment",
      itemID: existingItem._id,
      quantity: stocks,
      item: existingItem.itemName,
      itemDes: existingItem.itemDescription,
      category: existingItem.category,
      userID: req.user._id,
      user: req.user.fname + " " + req.user.lname,
      timestamp: new Date(),
    });

    const savedLog = await newLogEntry.save();

    if (savedLog) {
      let action = "update";
      incrementItemsCount(action);
    }

    if (
      existingItem.addedBy !== addedBy &&
      existingItem.addedBy.indexOf(addedBy) === -1
    ) {
      // Concatenate the new addedBy with the existing addedBy
      existingItem.addedBy = existingItem.addedBy + ", " + addedBy;
    }
    await existingItem.save();

    res.status(201).json({
      _id: existingItem._id,
      itemName: existingItem.itemName,
      itemDescription: existingItem.itemDescription,
      quantity: existingItem.quantity,
    });
  } else {
    const item = await Item.create({
      itemName: iName,
      itemDescription: iDescription,
      category: category,
      quantity: stocks,
      addedBy: addedBy,
    });

    if (item) {
      const newLogEntry = new AuditLogs({
        action: "Appended new Item",
        itemID: item._id,
        item: item.itemName,
        itemDes: item.itemDescription,
        category: item.category,
        userID: req.user._id,
        user: req.user.fname + " " + req.user.lname,
        timestamp: new Date(),
      });

      const logSaved = await newLogEntry.save();

      if (logSaved) {
        let action = "add";
        incrementItemsCount(action);
      }

      res.status(201).json({
        _id: item._id,
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        category: item.category,
        quantity: item.quantity,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc Get all items
// route GET /api/items/data
// @access Private
const getItemData = asyncHandler(async (req, res) => {
  const items = await Item.find({});

  if (items) {
    res.status(200).json(items);
  } else {
    res.status(404);
    throw new Error("No Items found");
  }
});

// @desc Get items count
// route GET /api/items/data
// @access Private
const getItemsCount = asyncHandler(async (req, res) => {
  const items = await Item.countDocuments({});

  if (items) {
    res.status(200).json(items);
  } else {
    res.status(404);
    throw new Error("No Items found");
  }
});

// @desc Get item by ID and update t
// route GET /api/items/data/:id
// @access Private
const getItemThenUpdate = asyncHandler(async (req, res) => {
  const {id} = req.params; // Get the item ID from the URL

  const {iName, iDescription, stocks} = req.body;

  // Find the item by ID and update it with the data from the request body
  const updatedItem = await Item.findByIdAndUpdate(id, {
    itemName: iName,
    itemDescription: iDescription,
    quantity: stocks,
  });

  if (updatedItem) {
    const newLogEntry = new AuditLogs({
      action: "Updated item",
      itemID: updatedItem._id,
      item: updatedItem.itemName,
      itemDes: updatedItem.itemDescription,
      category: updatedItem.category,
      userID: req.user._id,
      user: req.user.fname + " " + req.user.lname,
      timestamp: new Date(),
    });

    if (newLogEntry) {
      await newLogEntry.save();
      const action = "update";
      incrementItemsCount(action);
    }

    res.status(200).json(updatedItem);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// @desc Get item by ID and delete
// route GET /api/items/data/:id
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
  const {id} = req.params; // Get the item ID from the URL
  const deleted = await Item.findByIdAndDelete(id);

  if (deleted) {
    const newLogEntry = new AuditLogs({
      action: "Deleted Item",
      itemID: deleted._id,
      item: deleted.itemName,
      itemDes: deleted.itemDescription,
      category: deleted.category,
      userID: req.user._id,
      user: req.user.fname + " " + req.user.lname,
      timestamp: new Date(),
    });

    await newLogEntry.save();

    let action = "delete";
    incrementItemsCount(action);

    res.status(200).json({deleted: deleted});
  }
});

// @desc Delete multiple Items
// route GET /api/items/deleteMultipleData
// @access Private
const deleteMultipleData = asyncHandler(async (req, res) => {
  const {itemsData, user} = req.body;

  const itemIDsArray = itemsData.map((item) => item.id);
  const itemNamesArray = itemsData.map((item) => item.name);

  const itemID = itemIDsArray.join(",");
  const itemName = itemNamesArray.join(",");

  console.log(itemIDsArray.length);

  const newLogEntry = new AuditLogs({
    action: "Deleted multiple items",
    itemID: itemID,
    item: itemName,
    itemDes: "",
    category: "",
    userID: user._id,
    user: user.fname + " " + user.lname,
    timestamp: new Date(),
  });

  await newLogEntry.save();

  // Use the list of item IDs to delete items
  const deleted = await Item.deleteMany({_id: {$in: itemIDsArray}});

  if (deleted) {
    let action = "delete";
    incrementItemsCount(action);

    res.status(200).json(deleted);
  } else {
    res.status(400);
    throw new Error("Error deleting");
  }
});

// @desc Convert Items Json to Excel
// route GET /api/items/data/:id
// @access Private
const exportItemsToExcel = asyncHandler(async (req, res) => {
  // Create a new Excel workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  const items = await Item.find();

  // Create an array to hold the data for the Excel worksheet
  const data = items.map((item) => ({
    itemID: item._id,
    itemName: item.itemName,
    itemDes: item.itemDescription,
    category: item.category,
    itemStock: item.quantity,
    addedByAndDate: item.addedBy + " " + item.createdAt,
    ModifyDate: item.updatedAt,
    // Add more columns as needed
  }));

  // Add your data to the worksheet
  worksheet.columns = [
    {header: "Item ID", key: "itemID", width: 32},
    {
      header: "Item name",
      key: "itemName",
      width: 25,
    },
    {header: "Item description", key: "itemDes", width: 32},
    {header: "Category", key: "category", width: 20},
    {header: "Item Stock", key: "itemStock", width: 10},
    {header: "Added by & date", key: "addedByAndDate", width: 20},
    {header: "Modify date", key: "ModifyDate", width: 20},
    // Add more columns as needed
  ];

  worksheet.addRows(data);

  // Generate a unique filename for the Excel file
  const filename = `Items-Table-${Date.now()}.xlsx`;

  // Save the Excel file
  const filePath = `./${filename}`;
  await workbook.xlsx.writeFile(filePath);

  // Set the response headers for the download
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

  // Create a read stream and pipe it to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

// Get Auditlogs Data
// route GET /api/audit/
// @access Private
const getAuditlogs = asyncHandler(async (req, res) => {
  const logs = await AuditLogs.find().sort({timestamp: 1});

  if (logs) {
    res.status(200).json(logs);
  }
});

// Get Auditlogs Data
// route GET /api/audit/chart/
// @access Private
const getItemsChartData = asyncHandler(async (req, res) => {
  const data = await ItemsChart.find().sort({number: 1});

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404);
    throw new Error("No Items chart found");
  }
});

const categoryCounts = asyncHandler(async (req, res) => {
  const categoryCounts = await Item.aggregate([
    {$group: {_id: "$category", count: {$sum: 1}}},
  ]);
  res.json(categoryCounts);
});

export {
  addItem,
  getItemData,
  getItemsCount,
  getItemThenUpdate,
  deleteItem,
  deleteMultipleData,
  exportItemsToExcel,
  getAuditlogs,
  getItemsChartData,
  categoryCounts,
};
