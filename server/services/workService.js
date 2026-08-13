import Work from "../models/Work.js";
import ApiError from "../utils/ApiError.js";
import { generateSequentialId } from "../utils/generateId.js";
import cloudinary from "../config/cloudinary.js";

export const createWork = async (data) => {
  const workId = await generateSequentialId("work", "PSP", 3);
  return await Work.create({ ...data, workId });
};

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
  const existingWork = await Work.findById(id);
  if (!existingWork) throw new ApiError(404, "Work not found");

  // If a new image was uploaded (different publicId), delete the old one from Cloudinary
  if (data.imagePublicId && data.imagePublicId !== existingWork.imagePublicId) {
    await cloudinary.uploader.destroy(existingWork.imagePublicId).catch(() => {
      // Log but don't block the update if Cloudinary cleanup fails
      console.error(
        "Failed to delete old Cloudinary image:",
        existingWork.imagePublicId,
      );
    });
  }

  const work = await Work.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return work;
};

export const deleteWork = async (id) => {
  const work = await Work.findById(id);
  if (!work) throw new ApiError(404, "Work not found");

  await cloudinary.uploader.destroy(work.imagePublicId).catch(() => {
    console.error("Failed to delete Cloudinary image:", work.imagePublicId);
  });

  await Work.findByIdAndDelete(id);
  return work;
};
