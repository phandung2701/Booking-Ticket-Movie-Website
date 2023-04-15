import { useState } from "react";

import { numberToString } from "../utils";
import "./Snacks.css";

const snacksData = [
  {
    id: 1,
    img: "https://www.tiendauroi.com/wp-content/uploads/2019/06/ca44264d97633d40d8eaea153208a50d54362f7c.jpeg",
    title: "My Combo",
    price: 89000,
    description:
      "1 bắp lớn + 1 nước siêu lớn. Nhận trong ngày xem phim. Miễn phí đổi vị bắp Caramel. Đổi vị phô mai phụ thêm tiền.",
  },
  {
    id: 2,
    img: "https://www.tiendauroi.com/wp-content/uploads/2019/06/ca44264d97633d40d8eaea153208a50d54362f7c.jpeg",
    title: "Mario Popcorn Bucket Combo",
    price: 199000,
    description:
      "1 hộp bắp Mario (kèm bắp) + 1 nước siêu lớn. Miễn phí đổi vị bắp phô mai, Caramel. Mix từ 2 vị trở lên chỉ với 19k. Nhận trong ngày xem phim.",
  },
  {
    id: 3,
    img: "https://www.tiendauroi.com/wp-content/uploads/2019/06/ca44264d97633d40d8eaea153208a50d54362f7c.jpeg",
    title: "Jungle Brown My Combo",
    price: 259000,
    description:
      "1 bình Jungle Brown + 2 nước siêu lớn. Mua thêm 1 bắp ngọt chỉ với 29k tại rạp. Nhận trong ngày xem phim. Mẫu ly phụ thuộc vào số lượng hàng tại rạp.",
  },
  {
    id: 4,
    img: "https://www.tiendauroi.com/wp-content/uploads/2019/06/ca44264d97633d40d8eaea153208a50d54362f7c.jpeg",
    title: "Jungle Brown Couple Combo",
    price: 499000,
    description:
      "2 bình Jungle Brown + 2 nước siêu lớn + 1 bắp ngọt lớn. Nhận trong ngày xem phim. Mẫu ly phụ thuộc vào số lượng hàng tại rạp.",
  },
  {
    id: 5,
    img: "https://www.tiendauroi.com/wp-content/uploads/2019/06/ca44264d97633d40d8eaea153208a50d54362f7c.jpeg",
    title: "Shazam My Combo",
    price: 219000,
    description:
      "1 ly Shazam + 1 nước siêu lớn + 1 bắp ngọt lớn tùy chọn vị. Nhận trong ngày xem phim.",
  },
  {
    id: 6,
    img: "https://www.tiendauroi.com/wp-content/uploads/2019/06/ca44264d97633d40d8eaea153208a50d54362f7c.jpeg",
    title: "CGV Snack Combo",
    price: 199000,
    description:
      "1 bắp lớn + 2 nước siêu lớn + 1 snack. Nhận trong ngày xem phim. Miễn phí đổi vị bắp Caramel. Đổi vị phô mai phụ thêm tiền.",
  },
];

const SnacksList = ({ isActive = true, selectedSnacks, setSelectedSnacks }) => {
  const [showSnacks, setShowSnacks] = useState(true);
  const [snacks, setSnacks] = useState(snacksData);

  const handleToggleClick = () => {
    setShowSnacks((prevShowSnacks) => !prevShowSnacks);
  };

  const handleIncrement = (id) => {
    setSnacks((prevSnacks) =>
      prevSnacks.map((snack) =>
        snack.id === id ? { ...snack, count: (snack.count || 0) + 1 } : snack
      )
    );
    setSelectedSnacks((prevSelectedSnacks) => {
      const snackIndex = prevSelectedSnacks.findIndex(
        (snack) => snack.id === id
      );
      if (snackIndex === -1) {
        return [
          ...prevSelectedSnacks,
          { ...snacksData.find((snack) => snack.id === id), count: 1 },
        ];
      } else {
        const snack = prevSelectedSnacks[snackIndex];
        return [
          ...prevSelectedSnacks.slice(0, snackIndex),
          { ...snack, count: snack.count + 1 },
          ...prevSelectedSnacks.slice(snackIndex + 1),
        ];
      }
    });
  };

  const handleDecrement = (id) => {
    setSnacks((prevSnacks) =>
      prevSnacks.map((snack) =>
        snack.id === id
          ? { ...snack, count: Math.max((snack.count || 0) - 1, 0) }
          : snack
      )
    );
    setSelectedSnacks((prevSelectedSnacks) => {
      const snackIndex = prevSelectedSnacks.findIndex(
        (snack) => snack.id === id
      );
      if (snackIndex === -1) {
        return prevSelectedSnacks;
      } else {
        const snack = prevSelectedSnacks[snackIndex];
        if (snack.count <= 1) {
          return [
            ...prevSelectedSnacks.slice(0, snackIndex),
            ...prevSelectedSnacks.slice(snackIndex + 1),
          ];
        } else {
          return [
            ...prevSelectedSnacks.slice(0, snackIndex),
            { ...snack, count: snack.count - 1 },
            ...prevSelectedSnacks.slice(snackIndex + 1),
          ];
        }
      }
    });
  };
  return (
    <div className="snacks-wrapper">
      <div className="snacks-header" onClick={handleToggleClick}>
        <h2>Snacks</h2>
        {!showSnacks && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill="white"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        )}
        {showSnacks && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-up"
            viewBox="0 0 16 16"
          >
            <path
              fill="white"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
          </svg>
        )}
      </div>

      {showSnacks && isActive && (
        <ul>
          {snacks.map(({ id, img, title, price, description, count }) => (
            <li key={id}>
              <div className="image-frame">
                <img src={img} alt={title} />
              </div>

              <div className="snack-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Giá: {numberToString(price)} VND</p>
                <div>
                  <button onClick={() => handleIncrement(id)}>+</button>

                  <span className="count">{count || 0}</span>

                  <button onClick={() => handleDecrement(id)}>-</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SnacksList;
