import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import { Image } from "antd";
const { Header } = Layout;
import { Avatar, Space } from "antd";

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
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "90px",
          display: "flex",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.97)",
          padding: "0 48px",
        }}
      >
        <img
          src="/images/login2.png"
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
