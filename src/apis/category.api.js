import axiosInstance from "../utils/http";

export const getAllCategory = async () => {
  const response = await axiosInstance.get("categories");

  return response.data;
};
