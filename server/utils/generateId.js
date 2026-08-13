import Counter from '../models/Counter.js'

export const generateSequentialId = async (counterName, prefix, padLength = 3) => {
  const counter = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  )

  const paddedNumber = String(counter.value).padStart(padLength, '0')
  return `${prefix}${paddedNumber}`
}