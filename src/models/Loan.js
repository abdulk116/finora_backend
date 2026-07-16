import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    loanName: {
      type: String,
      required: true,
      trim: true,
    },

    lender: {
      type: String,
      required: true,
      trim: true,
    },

    loanType: {
      type: String,
      enum: [
        "BANK",
        "EDUCATION",
        "HOME",
        "VEHICLE",
        "PERSONAL",
        "CREDIT_CARD",
        "FRIEND",
        "FAMILY",
        "OTHER",
      ],
      default: "OTHER",
    },

    principalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    outstandingAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    interestRate: {
      type: Number,
      default: 0,
      min: 0,
    },

    emiAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    emiDay: {
      type: Number,
      min: 1,
      max: 31,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "CLOSED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Loan", loanSchema);