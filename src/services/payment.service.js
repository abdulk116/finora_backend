import mongoose from "mongoose";
import Loan from "../models/Loan.js";
import Payment from "../models/Payment.js";
import ApiError from "../utils/ApiError.js";

class PaymentService {
  async payLoan(userId, loanId, payload) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const loan = await Loan.findOne({
        _id: loanId,
        user: userId,
      }).session(session);

      if (!loan) {
        throw new ApiError(404, "Loan not found");
      }

      if (loan.status === "CLOSED") {
        throw new ApiError(400, "Loan already closed");
      }

      if (payload.amount > loan.outstandingAmount) {
        throw new ApiError(
          400,
          "Payment amount exceeds outstanding balance"
        );
      }

      const [payment] = await Payment.create(
        [
          {
            ...payload,
            user: userId,
            loan: loanId,
          },
        ],
        { session }
      );

      loan.outstandingAmount -= payload.amount;

      if (loan.outstandingAmount === 0) {
        loan.status = "CLOSED";
      }

      await loan.save({ session });

      await session.commitTransaction();

      return payment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}

export default new PaymentService();