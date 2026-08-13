import { z } from 'zod'

export const createWorkSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters'),
  description: z.string().trim().optional(),
  category: z.string().trim().optional(),
  imageUrl: z.string().url('imageUrl must be a valid URL'),
  imagePublicId: z.string().min(1, 'imagePublicId is required'),
})

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message)
    return res.status(400).json({ success: false, message: 'Validation failed', errors })
  }
  req.body = result.data
  next()
}