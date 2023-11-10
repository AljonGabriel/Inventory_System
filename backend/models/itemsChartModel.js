import mongoose from "mongoose";

const itemsChartSchema = mongoose.Schema({
  month: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  addCount: {
    type: Number,
    default: 0,
  },
  updateCount: {
    type: Number,
    default: 0,
  },
  deleteCount: {
    type: Number,
    default: 0,
  },
});

itemsChartSchema.index({month: 1, year: 1, number: 1}, {unique: true});

const ItemsChart = mongoose.model("ItemsChart", itemsChartSchema);

export default ItemsChart;
