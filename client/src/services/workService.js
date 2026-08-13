import api from "./api";

export const getWorks = async (params = {}) => {
  const res = await api.get("/works", { params });
  return res.data.data;
};

export const createWork = async (payload) => {
  const res = await api.post("/works", payload);
  return res.data.data;
};

export const updateWork = async (id, payload) => {
  const res = await api.put(`/works/${id}`, payload);
  return res.data.data;
};

export const deleteWork = async (id) => {
  const res = await api.delete(`/works/${id}`);
  return res.data.data;
};
