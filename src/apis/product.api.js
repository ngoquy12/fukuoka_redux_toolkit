import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Hàm lấy danh sách sản phẩm từ API
 */
const getAllProduct = createAsyncThunk("product/getAllProduct", async () => {
  const response = await axios.get(
    "http://localhost:8080/api/v1/admin/products",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXZhbnRhbUBnbWFpbC5jb20iLCJpYXQiOjE3NTAwNzkyMjQsImV4cCI6MjY1MDA3OTIyNH0.aRNkcN9qIIiB2f6AX_5HEoCpGFvZ2m_ywwEt1VkNiqk",
      },
    }
  );

  return response.data;
});

const removeProduct = createAsyncThunk(
  "product/removeProduct",
  async (productId) => {
    await axios.delete(
      `http://localhost:8080/api/v1/admin/products/${productId}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXZhbnRhbUBnbWFpbC5jb20iLCJpYXQiOjE3NTAwNzkyMjQsImV4cCI6MjY1MDA3OTIyNH0.aRNkcN9qIIiB2f6AX_5HEoCpGFvZ2m_ywwEt1VkNiqk",
        },
      }
    );
    // Giá trị mà sau này trong slice sẽ nhận được thông qua action.payload
    return productId;
  }
);

export { getAllProduct, removeProduct };
