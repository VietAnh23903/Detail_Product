import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/ProductList1.css";
import { Card, Pagination } from 'antd';

const { Meta } = Card;

// Fake data cho danh sách sản phẩm
const fakeProducts = [
  {
    id: 1,
    name: "Giày Vans Knu Skool Nam Nữ",
    price: 399000,
    rating: 4.9,
    sold: 120, // Thêm số lượng đã bán
    imageUrl: "https://pos.nvncdn.com/f4d87e-8901/ps/20231107_UbIhjG7rNJ.jpeg",
  },
  {
    id: 2,
    name: "Giày Converse Classic",
    price: 499000,
    rating: 4.8,
    sold: 95, // Thêm số lượng đã bán
    imageUrl: "https://pos.nvncdn.com/f4d87e-8901/ps/20231107_UbIhjG7rNJ.jpeg",
  },
  {
    id: 3,
    name: "Giày Nike Air Jordan",
    price: 1599000,
    rating: 5.0,
    sold: 230, // Thêm số lượng đã bán
    imageUrl: "https://pos.nvncdn.com/f4d87e-8901/ps/20231107_UbIhjG7rNJ.jpeg",
  },
  {
    id: 4,
    name: "Giày Adidas Ultra Boost",
    price: 1999000,
    rating: 4.7,
    sold: 150, // Thêm số lượng đã bán
    imageUrl: "https://pos.nvncdn.com/f4d87e-8901/ps/20231107_UbIhjG7rNJ.jpeg",
  },
  {
    id: 5,
    name: "Giày Puma Suede Classic",
    price: 899000,
    rating: 4.6,
    sold: 78, // Thêm số lượng đã bán
    imageUrl: "https://pos.nvncdn.com/f4d87e-8901/ps/20231107_UbIhjG7rNJ.jpeg",
  },
];


const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 4; // Số sản phẩm mỗi trang

  // Tính toán sản phẩm hiển thị trên mỗi trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = fakeProducts.slice(startIndex, startIndex + itemsPerPage);

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="product-section">
      <h2 className="product-title">SẢN PHẨM MỚI</h2>
      <div className="product-list">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={product.imageUrl || "https://via.placeholder.com/150"} />}
              >
              <Meta
                title={product.name}
                description={
                  <>
                    <p className="product-price">{product.price.toLocaleString()}đ</p>
                    <p className="product-rating">
                      ⭐ {product.rating > 0 ? product.rating : "Chưa có đánh giá"}
                    </p>
                    <p className="product-sold">Đã bán: {product.sold}</p> {/* Thêm thông tin đã bán */}
                  </>
                }
              />

              </Card>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        align="center"
        current={currentPage}
        total={fakeProducts.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
