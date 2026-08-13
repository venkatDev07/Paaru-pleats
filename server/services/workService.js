import Work from '../models/Work.js'
import ApiError from '../utils/ApiError.js'
import { generateSequentialId } from '../utils/generateId.js'

export const createWork = async (data) => {
  const workId = await generateSequentialId('work', 'PSP', 3)
  return await Work.create({ ...data, workId })
}
export const getAllWorks = async ({ page = 1, limit = 10, category }) => {
  const filter = category ? { category } : {};
  const skip = (page - 1) * limit;

  const [works, total] = await Promise.all([
    Work.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Work.countDocuments(filter),
  ]);

  return {
    works,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
  };
};

export const getWorkById = async (id) => {
  const work = await Work.findById(id);
  if (!work) throw new ApiError(404, "Work not found");
  return work;
};

export const updateWork = async (id, data) => {
  const work = await Work.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!work) throw new ApiError(404, "Work not found");
  return work;
};

export const deleteWork = async (id) => {
  const work = await Work.findByIdAndDelete(id);
  if (!work) throw new ApiError(404, "Work not found");
  return work;
};
