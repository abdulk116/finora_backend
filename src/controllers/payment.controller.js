import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import paymentService from "../services/payment.service.js";

export const payLoan = asyncHandler(async (req, res) => {
  const payment = await paymentService.payLoan(
    req.user._id,
    req.params.loanId,
    req.body
  );

  res.status(201).json(
    new ApiResponse(
      201,
      "Payment recorded successfully",
      payment
    )
  );
});

export const getLoanPayments = asyncHandler(async (req, res) => {
  const payments = await paymentService.getLoanPayments(
    req.user._id,
    req.params.loanId
  );

  res.json(
    new ApiResponse(
      200,
      "Payments fetched successfully",
      payments
    )
  );
});