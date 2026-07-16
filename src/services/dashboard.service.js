import Loan from "../models/Loan.js";
import Payment from "../models/Payment.js";

class DashboardService {
  async getDashboard(userId) {
    const summary = await Loan.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,

          totalOutstanding: {
            $sum: "$outstandingAmount",
          },

          monthlyEmi: {
            $sum: "$emiAmount",
          },

          activeLoans: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "ACTIVE"],
                },
                1,
                0,
              ],
            },
          },

          closedLoans: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "CLOSED"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const upcomingLoans = await Loan.find({
      user: userId,
      status: "ACTIVE",
    })
      .sort({
        emiDay: 1,
      })
      .limit(5);

    const recentPayments = await Payment.find({
      user: userId,
    })
      .populate("loan", "loanName")
      .sort({
        paymentDate: -1,
      })
      .limit(5);

    return {
      summary: summary[0] || {
        totalOutstanding: 0,
        monthlyEmi: 0,
        activeLoans: 0,
        closedLoans: 0,
      },

      upcomingLoans,

      recentPayments,
    };
  }
}

export default new DashboardService();