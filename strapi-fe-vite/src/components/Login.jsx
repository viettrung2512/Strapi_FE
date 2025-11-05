import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Checkbox, message } from "antd";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      });

      const { jwt, user } = res.data;

      // Lưu token
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      message.success("Đăng nhập thành công!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      message.error(
        err.response?.data?.error?.message || "Đăng nhập thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* LEFT Illustration */}
      <div className="login-left">
        <div className="login-left-overlay"></div>
        <div className="login-left-content">
          <h2 className="login-title">KIMEI</h2>
          <p className="login-slogan">
            “Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ...”
          </p>
          <img
            src="/images/kimei-logo-vertical.png"
            alt="KIMEI Logo"
            className="login-logo"
          />
        </div>
      </div>

      {/* RIGHT Login Form */}
      <div className="login-right">
        <div className="login-card">
          <h1 className="login-heading">Đăng nhập</h1>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
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
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
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

            <div className="login-flex-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ</Checkbox>
              </Form.Item>

              <Link to="/forgot-password" className="login-link">
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="login-btn"
            >
              Đăng nhập
            </Button>
          </Form>

          <p className="login-footer-text">
            Chưa có tài khoản?{" "}
            <Link to="/signup" className="login-link">
              Đăng ký
            </Link>
          </p>

          <p className="login-copy">© 2025 KIMEI. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
