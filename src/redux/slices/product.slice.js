import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct, removeProduct } from "../../apis/product.api";

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Triển khai Promise
    builder.addCase(getAllProduct.pending, (state) => {
      // Do chưa có dữ liệu nên chỉ cập nhật status
      state.status = "pending";
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      // Lúc này đã có dữ liệu => Cập nhật state và data
      state.status = "fulfilled";
      state.data = action.payload.content;
    });
    builder.addCase(getAllProduct.rejected, (state, action) => {
      // Lúc này có lỗi => Cập nhật status và error
      state.status = "rejected";
      state.error = action.error.message;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      // Cập nhật mảng sau khi xóa 1 sản phẩm
      state.data = state.data.filter((pro) => pro.id !== action.payload); // action.payload là id được trả về từ hàm removeProduct, state.data là mảng product ban đầu
    });
  },
});

export default productSlice.reducer;
