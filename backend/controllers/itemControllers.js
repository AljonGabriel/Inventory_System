import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

// @desc Add item
// route GET /api/items/
// @access Private
const addItem = asyncHandler(async (req, res) => {
  const {iName, iDescription, stocks} = req.body;

  const item = await Item.create({
    itemName: iName,
    itemDescription: iDescription,
    quantity: stocks,
  });

  if (item) {
    res.status(201).json({
      _id: item._id,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      quantity: item.quantity,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
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

const deleteItem = asyncHandler(async (req, res) => {
  const {id} = req.params; // Get the item ID from the URL
  const deleted = await Item.findByIdAndDelete(id);

  if (deleted) {
    res.status(200).json({deleted: deleted});
  }
});

export {addItem, getItemData, getItemsCount, getItemThenUpdate, deleteItem};
