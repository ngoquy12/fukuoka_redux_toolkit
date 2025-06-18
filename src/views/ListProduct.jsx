import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getAllProduct,
  removeProduct,
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
} from "antd";
import { getAllCategory } from "../apis/category.api";

export default function ListProduct() {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const { status, data, error } = useSelector((state) => state.product); // Lấy dữ liệu từ trong Store
  const [categories, setCategories] = useState([]);

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
    setIsShowModal(true);
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
      title: "Hành động",
      render: (_, record) => (
        <Space size="middle">
          <Button>Sửa</Button>
          <Button onClick={() => handleShowModalDelete(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      //  Bắn dispatch vào trong middleware để xử lý
      await dispatch(createProduct(values)).unwrap(); // Trả về  nếu có lỗi

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
        title="Thêm mới sản phẩm"
        open={isShowModal}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Tên sản phẩm" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh" name="image">
            <Input />
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
              <Button type="primary" htmlType="submit">
                Thêm
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
