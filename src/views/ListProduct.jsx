import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getAllProduct,
  removeProduct,
  updateProduct,
} from "../apis/product.api";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import { getAllCategory } from "../apis/category.api";
import { UploadOutlined } from "@ant-design/icons";
import { uploadToCloudinary } from "../utils/uploadFile";

export default function ListProduct() {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const { status, data, error } = useSelector((state) => state.product); // Lấy dữ liệu từ trong Store
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    //  Fill dữ liệu của product vào trong Form
    form.setFieldsValue({
      ...productInfo,
      categoryId: productInfo?.category?.id,
    });

    // Cho phép người dùng xem được image
    setImageUrl(productInfo.image);
  }, [productInfo, form]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);
  // Gọi API lấy danh sách danh mục

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();

        setCategories(response.content);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    alert("Đã có lỗi xảy ra. Vui lòng kiểm tra lại");
    return;
  }

  // Hàm mở modal thêm mới
  const handleShowModal = () => {
    // Cập nhật state mở modal
    setIsShowModal(true);

    // Cập nhật id của product về null
    setProductId(null);
  };

  // Hàm đóng modal thêm mới
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleShowModalDelete = (id) => {
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");

    if (isConfirm) {
      // Bắn dispatch vào trong Slice để xử lý
      dispatch(removeProduct(id));
    }
  };

  // Mở modal sửa sản phẩm
  const handleShowModalEdit = (product) => {
    // Cập nhật state mở modal
    setIsShowModal(true);

    // Cập nhật lại id của sản phẩm cần edit
    setProductId(product.id);

    // Cập nhật thông tin sản phẩm vào state productInfo
    setProductInfo(product);
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image height={50} width={50} src={image} />,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      width: 200,
      title: "Hành động",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleShowModalEdit(record)}>Sửa</Button>
          <Button onClick={() => handleShowModalDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const props = {
    beforeUpload: async (file) => {
      const response = await uploadToCloudinary(file);

      if (response) {
        setImageUrl(response);
      }

      return response;
    },
    showUploadList: false,
  };

  const onFinish = (formValues) => {
    const values = { ...formValues, image: imageUrl };
    try {
      if (productId) {
        // Bắn dispatch cập nhật
        dispatch(updateProduct({ productId, values }));
      } else {
        //  Bắn dispatch thêm mới vào trong middleware để xử lý
        dispatch(createProduct(values)).unwrap(); // Trả về  nếu có lỗi
      }

      // Đóng modal thêm mới
      handleCloseModal();
    } catch (error) {
      if (error) {
        alert("Thêm sản phẩm thất bại: ");
      }
    }
  };

  return (
    <>
      {/* Modal thêm mới sản phẩm */}
      <Modal
        onCancel={handleCloseModal}
        footer={null}
        title={`${productId ? "Cập nhật" : "Thêm mới"} sản phẩm`}
        open={isShowModal}
      >
        <Form
          form={form}
          name="formProduct"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Tên sản phẩm" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh" name="image">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Upload style={{ width: "100%" }} {...props}>
                  <Button className="w-full" icon={<UploadOutlined />}>
                    Tải hình ảnh lên
                  </Button>
                </Upload>
              </div>
              {imageUrl && (
                <Image
                  className="flex-1"
                  src={imageUrl}
                  height={50}
                  width={50}
                />
              )}
            </div>
          </Form.Item>
          <Form.Item label="Số lượng" name="quantity">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Giá" name="price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Danh mục" name="categoryId">
            <Select
              placeholder="Chọn danh mục"
              showSearch
              optionFilterProp="label"
              style={{ width: "100%" }}
              options={categories?.map((cat) => {
                return {
                  label: cat.name,
                  value: cat.id,
                };
              })}
            />
          </Form.Item>

          <Form.Item label={null}>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleCloseModal}
                type="default"
                htmlType="button"
              >
                Hủy
              </Button>
              <Button disabled={!imageUrl} type="primary" htmlType="submit">
                {productId ? "Lưu" : "Thêm"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <div className="m-[100px]">
        {status === "pending" && <div>Đang tải dữ liệu</div>}

        <div className="flex justify-between mb-3">
          <h3>Danh sách sản phẩm</h3>
          <Button onClick={handleShowModal}>Thêm mới sản phẩm</Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey={"id"} />
      </div>
    </>
  );
}
