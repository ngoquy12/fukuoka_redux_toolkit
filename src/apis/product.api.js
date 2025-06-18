import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/http";

/**
 * Hàm lấy danh sách sản phẩm từ API
 */
const getAllProduct = createAsyncThunk("product/getAllProduct", async () => {
  const response = await axiosInstance.get("products");

  return response.data;
});

const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (productId) => {
    await axiosInstance.delete(`products/${productId}`);
    // Giá trị mà sau này trong slice sẽ nhận được thông qua action.payload
    return productId;
  }
);

const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    const response = await axiosInstance.post("products", productData);

    return response.data;
  }
);

export { getAllProduct, removeProduct, createProduct };
