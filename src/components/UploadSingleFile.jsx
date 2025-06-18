import { Button } from "antd";
import axios, { HttpStatusCode } from "axios";
import React, { useState } from "react";

export default function UploadSingleFile() {
  const [file, setFile] = useState(null); // Giá trị trong input type file
  const [imagePreview, setImagePreview] = useState(""); // Link hình ảnh preview
  const [imageUrl, setImageUrl] = useState(""); // Link hình ảnh sau khi upload thành công
  const [isUploading, setIsUploading] = useState(false);

  // Lấy giá trị trong input và tạo ảnh preview
  const handleChange = (event) => {
    const fileName = event.target.files[0];

    if (fileName) {
      // Tạo ảnh preview
      setImagePreview(URL.createObjectURL(fileName));

      //   Lấy ra giá trị của file
      setFile(fileName);
    }
  };

  const handleUpload = async () => {
    // Bước 1: Validate dữ liệu
    if (!file) {
      alert("Vui lòng chọn file");
      return;
    }

    // Bước 2: Tạo form data chứa dữ liệu (file, upload_preset, cloud_name)
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "fukuoka_upload");
    formData.append("cloud_name", "ngovanquy");

    // Bước 3: Gọi API upload tài nguyên
    try {
      // Hiển thị loading
      setIsUploading(true);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ngovanquy/image/upload",
        formData
      );

      // Bước 4: Xử lý phản hồi từ server
      if (response.status === HttpStatusCode.Ok) {
        // Lấy ra đường đãn hình ảnh
        setImageUrl(response.data.secure_url);
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      // Đóng loading
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <Button type="primary" loading={isUploading} onClick={handleUpload}>
        {isUploading ? "Uploading" : "Upload"}
      </Button>

      {imageUrl ? (
        <div>
          <h3>Image Upload Done</h3>
          <img
            height={200}
            width={400}
            src={imageUrl}
            alt="Ảnh tải thành công"
          />
        </div>
      ) : (
        <div>
          <h3>Image Preivew</h3>
          <img
            height={200}
            width={400}
            src={imagePreview}
            alt="Ảnh xem trước"
          />
        </div>
      )}
    </div>
  );
}
