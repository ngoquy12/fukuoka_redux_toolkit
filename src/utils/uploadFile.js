import axios from "axios";

// Hàm upload file lên cloudinary và trả về url nếu thành công
export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
      formData
    );

    if (response) {
      return response.data.secure_url;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
