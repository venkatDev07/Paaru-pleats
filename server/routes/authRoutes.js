import express from 'express'
import { login, logout, getMe } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { loginSchema } from '../validators/authValidator.js'
import protect from '../middleware/protect.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Admin authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, sets httpOnly cookie
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate(loginSchema), login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', logout)

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged-in admin
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current admin info
 *       401:
 *         description: Not authenticated
 */
router.get('/me', protect, getMe)

export default router