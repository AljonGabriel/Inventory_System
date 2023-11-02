import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import ExcelJS from "exceljs";
import fs from "fs";

// @desc Add item
// route GET /api/items/
// @access Private
const addItem = asyncHandler(async (req, res) => {
  const {iName, iDescription, category, stocks, addedBy} = req.body;

  // Convert stocks to a number
  const stocksNumber = parseInt(stocks, 10); // Assuming it's an integer

  const existingItem = await Item.findOne({
    itemName: iName,
    itemDescription: iDescription,
    category: category,
  });

  if (existingItem) {
    // If it exists, update the quantity by adding the new stocks
    existingItem.quantity = existingItem.quantity + stocksNumber;
    // Check if the addedBy is different from the existing addedBy
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
    res.status(200).json({deleted: deleted});
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

export {
  addItem,
  getItemData,
  getItemsCount,
  getItemThenUpdate,
  deleteItem,
  exportItemsToExcel,
};
