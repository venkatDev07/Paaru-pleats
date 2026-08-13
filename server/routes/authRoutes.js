import express from 'express'
import { login, logout, getMe } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { loginSchema } from '../validators/authValidator.js'
import protect from '../middleware/protect.js'

const router = express.Router()
router.post('/login', validate(loginSchema), login)
router.post('/logout', logout)
router.get('/me', protect, getMe)

export default router