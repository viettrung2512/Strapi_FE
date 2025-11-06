import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import "./Signup.css";
import axios from "axios";
import AvatarUpload from "./AvatarUpload";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("🚀 Starting registration process...");

      // BƯỚC 1: Đăng ký user trước (không có avatar)
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: values.fullName,
          email: values.email,
          password: values.password,
          // KHÔNG gửi avatar ở bước này
        }
      );

      const { jwt, user } = res.data;
      console.log("✅ User registered successfully:", user.id);

      // Lưu token ngay lập tức
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      // BƯỚC 2: Nếu có avatar, upload SAU KHI có token
      if (avatarFile) {
        try {
          console.log("📸 Uploading avatar...");
          const formData = new FormData();
          formData.append("files", avatarFile);
          formData.append("field", "avatar"); // Quan trọng: chỉ định field

          const uploadRes = await axios.post(
            "http://localhost:1337/api/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${jwt}`, // Sử dụng token mới nhận được
              },
            }
          );

          if (uploadRes.data && uploadRes.data[0]) {
            const avatarId = uploadRes.data[0].id;
            console.log("✅ Avatar uploaded, ID:", avatarId);

            // BƯỚC 3: Cập nhật user với avatar
            await axios.put(
              `http://localhost:1337/api/users/${user.id}`,
              {
                avatar: avatarId,
              },
              {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              }
            );
            console.log("✅ User updated with avatar");
          }
        } catch (uploadError) {
          console.error("❌ Avatar upload error:", uploadError);
          // Vẫn tiếp tục dù upload avatar thất bại
          message.warning("Đăng ký thành công nhưng upload ảnh thất bại");
        }
      }

      message.success("Đăng ký thành công!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Registration error:", err);
      message.error(err.response?.data?.error?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (file) => {
    setAvatarFile(file);
  };

  return (
    <div className="signup-container">
      {/* LEFT Illustration */}
      <div className="signup-left">
        <div className="signup-left-overlay"></div>
        <div className="signup-left-content">
          <h2 className="signup-title">KIMEI</h2>
          <p className="signup-slogan">
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện
            thực những mục tiêu khát vọng."
          </p>
          <img
            src="/images/kimei-logo-vertical.png"
            alt="KIMEI Logo"
            className="signup-logo"
          />
        </div>
      </div>

      {/* RIGHT Signup Form */}
      <div className="signup-right">
        <div className="signup-card">
          <h1 className="signup-heading">Đăng ký</h1>

          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="avatar"
              label={
                <span className="upload-label">
                  Ảnh đại diện
                  <span className="upload-optional">(Tùy chọn)</span>
                </span>
              }
            >
              <AvatarUpload onAvatarChange={handleAvatarChange} />
            </Form.Item>

            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập họ và tên"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="you@example.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="••••••••"
                iconRender={(visible) =>
                  visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                }
                size="large"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="signup-btn"
            >
              Đăng ký
            </Button>
          </Form>

          <p className="signup-footer-text">
            Đã có tài khoản?{" "}
            <Link to="/login" className="signup-link">
              Đăng nhập
            </Link>
          </p>

          <p className="signup-copy">
            © 2025 KIMEI. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
}