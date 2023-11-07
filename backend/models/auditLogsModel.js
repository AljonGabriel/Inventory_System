import mongoose from "mongoose";

const auditLogsSchema = mongoose.Schema(
  {
    action: {
      type: String,
      require: true,
    },
    logDes: {
      type: String,
      require: true,
    },
    itemID: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    item: {
      type: String,
      require: true,
    },
    itemDes: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    userID: {
      type: String,
      require: true,
    },
    user: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const AuditLogs = mongoose.model("auditLogs", auditLogsSchema);
export default AuditLogs;
