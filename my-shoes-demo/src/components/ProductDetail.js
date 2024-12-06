import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/ProductDetail.css";
import { Radio } from "antd";

// Fake data giống ProductList
const fakeProducts = [
  {
    id: 1,
    name: "Giày Vans Knu Skool Nam Nữ",
    price: 399000,
    rating: 5.0,
    sold: 120,
    imageUrl: "https://pos.nvncdn.com/f4d87e-8901/ps/20231107_UbIhjG7rNJ.jpeg",
    images: [
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/378/584/products/z5703624664632-99fc91984cfac3ff7e30a007739ac5e0.jpg?v=1722915213383",
      "https://bizweb.dktcdn.net/100/413/756/products/nike-court-royale-749747-141.jpg?v=1685069853643",
    ],
    sizes: [36, 37, 38, 39, 40],
    variants: [
      { color: "Đỏ Knu Skool", stock: 10 },
      { color: "Đen Knu Skool", stock: 5 },
      { color: "Xám Knu Skool", stock: 8 },
    ],
    reviews: [
      {
        id: 1,
        username: "ztp1oa93gt",
        rating: 5,
        date: "2023-03-13 22:07",
        comment: "Khuyên mọi người nên mua vì giày rất đẹp và cũng khá êm.",
        images: [
          "https://pos.nvncdn.com/f4d87e-8901/ps/20231107_UbIhjG7rNJ.jpeg",
          "https://bizweb.dktcdn.net/100/413/756/products/nike-court-royale-749747-141.jpg?v=1685069853643",
        ],
      },
      // Thêm các đánh giá khác
    ],
  },
  // Thêm các sản phẩm khác nếu cần
];

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const product = fakeProducts.find((item) => item.id === parseInt(id));
  const [mainImage, setMainImage] = useState(product?.imageUrl || ""); // Ảnh chính
  const [quantity, setQuantity] = useState(1); // Số lượng

  if (!product) {
    return <p>Sản phẩm không tồn tại!</p>;
  }

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= 99) setQuantity(value);
  };

  return (
    <div className="product-detail">
      {/* Phần bên trái */}
      <div className="product-detail-left">
        <div className="main-image">
          <img src={mainImage} alt="Product" />
        </div>
        <div className="thumbnail-images">
          {[product.imageUrl, ...product.images].map((img, index) => (
            <div
              key={index}
              className={`thumbnail-item ${mainImage === img ? "active" : ""}`}
              onMouseEnter={() => setMainImage(img)}
            >
              <img src={img} alt={`Thumbnail ${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Phần bên phải */}
      <div className="product-detail-right">
        <h1 className="product-name">{product.name}</h1>
        <div className="product-rating-sold">
          <span>⭐ {product.rating}/5.0</span>
          <span>{product.sold} đã bán</span>
        </div>
        <div className="product-price-section">
          <span className="product-price">
            {product.price.toLocaleString()}đ
          </span>
        </div>
        <div className="product-variant">
          <h3>Màu sắc:</h3>
          <Radio.Group>
            {product.variants.map((variant, index) => (
              <Radio key={index} value={variant.color}>
                {variant.color}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <div className="product-size">
          <h3>Kích thước:</h3>
          <Radio.Group>
            {product.sizes.map((size) => (
              <Radio key={size} value={size}>
                {size}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <div className="product-quantity">
          <h3>Số lượng:</h3>
          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max="99"
            />
            <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
          </div>
        </div>
        <div className="product-buttons">
          <button className="add-to-cart">Thêm vào giỏ hàng</button>
          <button className="buy-now">Mua ngay</button>
        </div>
      </div>

      {/* Phần đánh giá sản phẩm */}
      <section className="product-reviews">
        <h2>Đánh giá sản phẩm</h2>
        <div className="reviews-summary">
          <div className="rating-summary">
            <span className="average-rating">
              {product.rating} ⭐ (trên 5)
            </span>
            <span className="total-reviews">
              {product.reviews.length} Đánh giá
            </span>
          </div>
        </div>

        {/* Danh sách đánh giá */}
        {product.reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="review-username">{review.username}</span>
              <span className="review-rating">⭐ {review.rating}</span>
              <span className="review-date">{review.date}</span>
            </div>
            <p>{review.comment}</p>
            <div className="review-images">
              {review.images.map((img, index) => (
                <img key={index} src={img} alt={`Review ${index}`} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProductDetail;
