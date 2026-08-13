import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = process.env.ADMIN_EMAIL || process.argv[2];
    const password = process.env.ADMIN_PASSWORD || process.argv[3];

    if (!email || !password) {
      console.log("Usage: node scripts/seedAdmin.js <email> <password>");
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin with this email already exists");
      process.exit(0);
    }

    const admin = await Admin.create({ email, password });
    console.log("Admin created successfully:", admin.email);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
