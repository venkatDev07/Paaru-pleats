import express from "express";
import {
  createWork,
  getWorks,
  getWork,
  updateWork,
  deleteWork,
} from "../controllers/workController.js";
import { validate, createWorkSchema } from "../validators/workValidator.js";
import { validate } from "../middleware/validate.js";
import { createWorkSchema } from "../validators/workValidator.js";
import protect from "../middleware/protect.js";
const router = express.Router();

router.post("/", protect, validate(createWorkSchema), createWork);
router.get("/", getWorks); // public - anyone can view works
router.get("/:id", getWork); // public
router.put("/:id", protect, validate(createWorkSchema), updateWork);
router.delete("/:id", protect, deleteWork);

export default router;
