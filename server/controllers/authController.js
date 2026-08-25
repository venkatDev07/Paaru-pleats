import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as authService from "../services/authService.js";

const isProduction = process.env.NODE_ENV === "production";

export const login = asyncHandler(async (req, res) => {
  const { token, admin } = await authService.loginAdmin(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // true when NODE_ENV=production
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(new ApiResponse(200, { admin }, "Login successful"));
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});

export const getMe = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, { admin: req.admin }, "Authenticated"));
});
