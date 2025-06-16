import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter", // Tên của slice
  initialState: 0, // Giá trị khởi tạo của counterSlice
  reducers: {
    // Chứa các hàm mà người dùng gửi lên để cập nhật lại State
    // Hàm tăng giá trị của state lên 1
    increase: (state) => {
      return state + 1;
    },

    // Hàm giảm giá trị của state đi 1
    decrease: (state) => {
      return state - 1;
    },

    // Hàm tạo ra 1 số ngẫu nhiên và cập nhật lại giá trị hiện tại của State
    randomNumber: (_, action) => {
      return action.payload;
    },

    // Hàm tạo ra 1 số ngẫu nhiên và cập nhật lại giá trị hiện tại của State
    resetNumber: () => {
      return 0;
    },
  }, // Xử lý các tác vụ đồng bộ mà làm ảnh hưởng đến State hiện
  //   extraReducers: {}, // Xử lý các tác vụ bất đồng bộ và cập nhật lại state (nếu có)
});

//  Export các actions ra bên ngoài để sử dụng
export const { increase, decrease, randomNumber, resetNumber } =
  counterSlice.actions;

export default counterSlice.reducer; // Để hiểu đây là 1 reducer
