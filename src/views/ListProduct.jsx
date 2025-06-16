import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, removeProduct } from "../apis/product.api";
import { Button, Image, Space, Table, Tag } from "antd";

export default function ListProduct() {
  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.product); // Lấy dữ liệu từ trong Store

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  if (error) {
    alert("Đã có lỗi xảy ra. Vui lòng kiểm tra lại");
    return;
  }

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

  return (
    <div>
      {status === "pending" && <div>Đang tải dữ liệu</div>}

      <h3>Danh sách sản phẩm</h3>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
    </div>
  );
}
