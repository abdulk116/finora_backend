import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import loanService from "../services/loan.service.js";

export const createLoan = asyncHandler(async (req, res) => {
  const loan = await loanService.createLoan(req.user._id, req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Loan created successfully", loan));
});

export const getLoans = asyncHandler(async (req, res) => {
  const loans = await loanService.getLoans(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Loans fetched successfully", loans));
});

export const getLoanById = asyncHandler(async (req, res) => {
  const loan = await loanService.getLoanById(
    req.user._id,
    req.params.id
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Loan fetched successfully", loan));
});

export const updateLoan = asyncHandler(async (req, res) => {
  const loan = await loanService.updateLoan(
    req.user._id,
    req.params.id,
    req.body
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Loan updated successfully", loan));
});

export const deleteLoan = asyncHandler(async (req, res) => {
  await loanService.deleteLoan(
    req.user._id,
    req.params.id
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Loan deleted successfully"));
});