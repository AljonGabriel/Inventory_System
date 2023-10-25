import asyncHandler from "express-async-handler";

// @desc Add item
// route GET /api/items/
// @access Private
const addItem = asyncHandler((req, res) => {
  return res.json("Add Item");
});

export {addItem};
