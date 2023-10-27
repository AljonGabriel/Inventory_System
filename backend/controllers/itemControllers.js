import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

// @desc Add item
// route GET /api/items/
// @access Private
const addItem = asyncHandler(async (req, res) => {
  const {itemName, itemDescription, quantity} = req.body;

  const item = await Item.create({
    itemName,
    itemDescription,
    quantity,
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

export {addItem, getItemData};
