import { Button } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import axios, { HttpStatusCode } from "axios";

export default function UploadMultipleFile() {
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChangeFiles = (event) => {
    // Chuyển đổi files thành một mảng
    const fileNames = Array.from(event.target.files);

    // Cập nhật đường dẫn để xem trước hình ảnh
    const filePreviews = fileNames.map((file) => URL.createObjectURL(file));

    // Đường dẫn preview
    setImagePreviews(filePreviews);

    // Giá trị thực trong input
    setFiles(fileNames);
  };

  // Hàm xóa hình ảnh preview
  const handleRemoveImage = (index) => {
    // Lọc ra các đường dẫn hình ảnh có index khác với index cần xóa
    const filterImagePreviewByIndex = imagePreviews.filter(
      (imgUrl, indexImage) => indexImage !== index
    );

    // Lọc ra các hình ảnh có index khác với index cần xóa
    const filterImageByIndex = files.filter(
      (imgUrl, indexImage) => indexImage !== index
    );

    // Cập nhật lại ảnh preview
    setImagePreviews(filterImagePreviewByIndex);

    // Cập nhật lại giá trị thực trong input
    setFiles(filterImageByIndex);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Vui lòng chọn file");
      return;
    }

    // Gọi API upload hình ảnh lên cloudinary
    try {
      // Mở loading
      setIsUploading(true);

      // Mảng lưu trữ đường dẫn ảnh sau khi upload thành công
      const urls = [];

      for (const file of files) {
        // Tạo form data
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "fukuoka_upload");
        formData.append("cloud_name", "ngovanquy");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ngovanquy/image/upload",
          formData
        );

        if (response.status === HttpStatusCode.Ok) {
          // Push đường dẫn vào trong mảng urls
          urls.push(response.data.secure_url);
        }
      }

      // Cập nhật lại state đại diện cho các hình ảnh đã upload thành công
      setImageUrls(urls);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      // Tắt loading
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleChangeFiles} />
      <Button loading={isUploading} onClick={handleUpload} type="primary">
        Upload
      </Button>

      {imageUrls.length === 0 ? (
        <div>
          <h2>Images preview</h2>

          {imagePreviews.map((image, index) => (
            <div key={index}>
              <img
                height={200}
                width={400}
                src={image}
                alt={`Image preview ${index + 1}`}
              />
              <CloseOutlined onClick={() => handleRemoveImage(index)} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Images Done</h2>

          {imagePreviews.map((image, index) => (
            <div key={index}>
              <img
                height={200}
                width={400}
                src={image}
                alt={`Image preview ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
