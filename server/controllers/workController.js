import asyncHandler from "../middleware/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as workService from "../services/workService.js";

export const createWork = asyncHandler(async (req, res) => {
  const work = await workService.createWork(req.body);
  res.status(201).json(new ApiResponse(201, work, "Work created successfully"));
});

export const getWorks = asyncHandler(async (req, res) => {
  const { page, limit, category } = req.query;
  const result = await workService.getAllWorks({ page, limit, category });
  res
    .status(200)
    .json(new ApiResponse(200, result, "Works fetched successfully"));
});

export const getWork = asyncHandler(async (req, res) => {
  const work = await workService.getWorkById(req.params.id);
  res.status(200).json(new ApiResponse(200, work, "Work fetched successfully"));
});

export const updateWork = asyncHandler(async (req, res) => {
  const work = await workService.updateWork(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, work, "Work updated successfully"));
});

export const deleteWork = asyncHandler(async (req, res) => {
  await workService.deleteWork(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Work deleted successfully"));
});
