import Loan from "../models/Loan.js";
import ApiError from "../utils/ApiError.js";

class LoanService {
  async createLoan(userId, payload) {
    const loan = await Loan.create({
      ...payload,
      user: userId,
    });

    return loan;
  }

  async getLoans(userId) {
    return await Loan.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  }

  async getLoanById(userId, loanId) {
    const loan = await Loan.findOne({
      _id: loanId,
      user: userId,
    });

    if (!loan) {
      throw new ApiError(404, "Loan not found");
    }

    return loan;
  }

  async updateLoan(userId, loanId, payload) {
    const loan = await Loan.findOneAndUpdate(
      {
        _id: loanId,
        user: userId,
      },
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!loan) {
      throw new ApiError(404, "Loan not found");
    }

    return loan;
  }

  async deleteLoan(userId, loanId) {
    const loan = await Loan.findOneAndDelete({
      _id: loanId,
      user: userId,
    });

    if (!loan) {
      throw new ApiError(404, "Loan not found");
    }

    return;
  }
}

export default new LoanService();