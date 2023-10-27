import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      require: true,
    },
    itemDescription: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.model("Items", itemSchema);

export default Item;
