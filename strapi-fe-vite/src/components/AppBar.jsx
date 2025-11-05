import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import { Image } from "antd";
const { Header } = Layout;
import { Avatar, Space } from "antd";
// import Logo from "../../public/images/Logo-kways";

// const KwaysLogo = () => (
//   <svg
//     width="150"
//     height="40"
//     viewBox="0 0 150 40"
//     xmlns="http://www.w3.org/2000/svg"
//     style={{ marginRight: "24px" }}
//   >
//     {/* Placeholder for complex logo */}
//     <g fill="#0052CC">
//       <circle cx="20" cy="20" r="18" fill="#0052CC" opacity="0.3" />
//       <circle cx="10" cy="10" r="8" fill="#DE350B" />
//       <circle cx="30" cy="10" r="8" fill="#FFAB00" />
//       <circle cx="20" cy="30" r="8" fill="#00B8D9" />
//     </g>
//     <text
//       x="50"
//       y="22"
//       fontFamily="Arial, sans-serif"
//       fontSize="20"
//       fontWeight="bold"
//       fill="#172B4D"
//     >
//       kways
//     </text>
//     <text
//       x="50"
//       y="34"
//       fontFamily="Arial, sans-serif"
//       fontSize="10"
//       fill="#5E6C84"
//     >
//       way to success
//     </text>
//   </svg>
// );

const appBarItems = [
  {
    key: "1",
    label: "Sản phẩm",
    children: [
      { key: "1-1", label: "Sản phẩm A" },
      { key: "1-2", label: "Sản phẩm B" },
    ],
  },
  {
    key: "2",
    label: "Lợi ích",
  },
  {
    key: "3",
    label: "Học viện OKR",
  },
  {
    key: "4",
    label: "Bài viết",
  },
  {
    key: "5",
    label: "Công ty",
    children: [
      { key: "5-1", label: "Về chúng tôi" },
      { key: "5-2", label: "Liên hệ" },
    ],
  },
  {
    key: "6",
    label: "Bảng giá",
  },
];
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Thông tin tài khoản
      </a>
    ),
  },
  {
    key: "2",
    danger: true,
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Đăng xuất
      </a>
    ),
    // icon: <SmileOutlined />,
    // disabled: true,
  },
];
const processedItems = appBarItems.map((item) => {
  if (item.children) {
    return {
      ...item,
      label: (
        <span>
          {item.label}
          <DownOutlined style={{ fontSize: "10px", marginLeft: "4px" }} />
        </span>
      ),
    };
  }
  return item;
});

const AppBar = () => {
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "90px",
          display: "flex",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "0 48px",
          // borderBottom: "1px solid #dfe1e6",
        }}
      >
        <img
          src="/images/Logo-kways.png"
          width="150"
          height="40"
          alt="Kimei"
          style={{ marginRight: "24px", display: "block", cursor: "pointer" }}
        />
        <Menu
          theme="light"
          mode="horizontal"
          items={processedItems}
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            borderBottom: "none",
            fontSize: "15px",
            fontWeight: 500,
          }}
        />
        <Dropdown menu={{ items }}>
          <Avatar
            size={40}
            style={{
              cursor: "pointer",
            }}
          />
        </Dropdown>
      </Header>
    </Layout>
  );
};

export default AppBar;
