import express from "express";
import {
  createWork,
  getWorks,
  getWork,
  updateWork,
  deleteWork,
} from "../controllers/workController.js";
import { validate, createWorkSchema } from "../validators/workValidator.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Works
 *   description: Manage daily saree pleating work posts
 */

/**
 * @swagger
 * /api/works:
 *   post:
 *     summary: Create a new work post
 *     tags: [Works]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - imageUrl
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Work created successfully
 */
router.post("/", validate(createWorkSchema), createWork);

/**
 * @swagger
 * /api/works:
 *   get:
 *     summary: Get all work posts (paginated)
 *     tags: [Works]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of works
 */
router.get("/", getWorks);

/**
 * @swagger
 * /api/works/{id}:
 *   get:
 *     summary: Get a single work post by ID
 *     tags: [Works]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work found
 *       404:
 *         description: Work not found
 */
router.get("/:id", getWork);

/**
 * @swagger
 * /api/works/{id}:
 *   put:
 *     summary: Update a work post
 *     tags: [Works]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Work updated
 *       404:
 *         description: Work not found
 */
router.put("/:id", validate(createWorkSchema), updateWork);

/**
 * @swagger
 * /api/works/{id}:
 *   delete:
 *     summary: Delete a work post
 *     tags: [Works]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work deleted
 *       404:
 *         description: Work not found
 */
router.delete("/:id", deleteWork);

export default router;
