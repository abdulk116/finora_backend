import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import dashboardService from "../services/dashboard.service.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboard(req.user._id);

  res.json(
    new ApiResponse(
      200,
      "Dashboard data fetched successfully",
      data
    )
  );
});