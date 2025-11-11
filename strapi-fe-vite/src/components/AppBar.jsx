import React from "react";
import { Layout, Menu, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Header } = Layout;
import { Avatar, Space } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import Notification from "./Notification";
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "1",
      label: (
        <div onClick={() => navigate("/profile")}>Thông tin tài khoản</div>
      ),
    },
    {
      key: "2",
      label: <div onClick={() => navigate("/questions")}>Quản lý câu hỏi</div>,
    },
    {
      key: "3",
      danger: true,
      label: <div onClick={handleLogout}>Đăng xuất</div>,
    },
  ];

  const getAvatarUrl = () => {
    if (!user?.avatar?.url) return null;
    if (
      user.avatar.url.startsWith("http") ||
      user.avatar.url.startsWith("blob:")
    ) {
      return user.avatar.url;
    }
    return `${API_URL}${user.avatar.url}`;
  };

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
        <Link to="/">
          <img
            src="/images/Logo-kways.png"
            width="150"
            height="40"
            alt="Kimei"
            style={{ marginRight: "24px", display: "block", cursor: "pointer" }}
          />
        </Link>
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
        <Notification></Notification>
        <Dropdown
          menu={{ items: userMenuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar
              size={40}
              src={getAvatarUrl()}
              style={{
                ...(getAvatarUrl() ? {} : { backgroundColor: "#000000" }),
                marginRight: "8px",
              }}
            >
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <span style={{ marginRight: "8px", fontWeight: 500 }}>
              {user?.username || "User"}
            </span>
            <DownOutlined style={{ fontSize: "12px" }} />
          </div>
        </Dropdown>
      </Header>
    </Layout>
  );
};

export default AppBar;
