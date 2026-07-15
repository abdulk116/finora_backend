import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", data));
});

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Login successful", data));
});