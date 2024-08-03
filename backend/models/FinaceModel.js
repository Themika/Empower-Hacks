const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const financeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    depositeAmount: {
      type: Number,
      required: false,
      min: 0
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Utilities",
        "Entertainment",
        "Health",
        'Education',
        'Shopping',
        'Investment',
        'Salary',
        'Gift',
        'Bonus',
        "Other",
      ],
    },
    description: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Income", "Expense", 'Deposit'],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Finance", financeSchema);
