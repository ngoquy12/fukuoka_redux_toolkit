import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  getAllProduct,
  removeProduct,
  updateProduct,
} from "../../apis/product.api";

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
    // Cập nhật Store sau khi xóa
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      // Cập nhật mảng sau khi xóa 1 sản phẩm
      state.data = state.data.filter((pro) => pro.id !== action.payload); // action.payload là id được trả về từ hàm removeProduct, state.data là mảng product ban đầu
    });
    // Cập nhật Store sau khi thêm mới
    builder.addCase(createProduct.fulfilled, (state, action) => {
      // Cập nhật lại state
      state.data.unshift(action.payload);
    });
    // Cập nhật store sau khi chỉnh sửa sản phẩm
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      // Lấy ra id và thông tin sản phẩm
      const { id, product } = action.payload;

      // Lấy ra vị trí của phần tử trong mảng theo id
      const productIndex = state.data.findIndex((pro) => pro.id === id);

      // Kiểm tra vị trí phần tử trong mảng, nếu khác -1 thì tiến hành cập nhật
      if (productIndex !== -1) {
        state.data[productIndex] = product;
      }
    });
  },
});

export default productSlice.reducer;
