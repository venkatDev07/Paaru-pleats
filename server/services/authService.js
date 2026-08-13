import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(admin._id);
  return { token, admin: { id: admin._id, email: admin.email } };
};
