import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "./asyncHandler.js";

// const protect = asyncHandler(async (req, res, next) => {
//   console.log("Cookies received:", req.cookies);
//   console.log("Raw cookie header:", req.headers.cookie);
//   const token = req.cookies.token;
//   if (!token) {
//     throw new ApiError(401, "Not authorized, no token");
//   }

//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (error) {
//     throw new ApiError(401, "Not authorized, invalid token");
//   }

//   const admin = await Admin.findById(decoded.id).select("-password");
//   if (!admin) {
//     throw new ApiError(401, "Not authorized, admin not found");
//   }

//   req.admin = admin;
//   next();
// });
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    throw new ApiError(401, "Not authorized, no token");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Not authorized, invalid token");
  }

  const admin = await Admin.findById(decoded.id).select("-password");
  if (!admin) {
    throw new ApiError(401, "Not authorized, admin not found");
  }

  req.admin = admin;
  next();
});

export default protect;
