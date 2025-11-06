import { useState } from "react";
import { Form, Input, message, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

const onFinish = async (values) => {
  setLoading(true);
  try {
    const url = "http://localhost:1337/api/auth/forgot-password";

    console.log("📨 Sending forgot-password:", values.email);

    const res = await axios.post(
      url,
      { email: values.email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Forgot password response:", res.data);
    console.log("📧 Email should be sent to:", values.email);

    message.success("Vui lòng kiểm tra email để đặt lại mật khẩu!");
    form.resetFields();
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    console.error("❌ Error response:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);

    message.error(
      error.response?.data?.error?.message ||
        "Không thể gửi email. Kiểm tra cấu hình Strapi."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <Row className="forgot-container">
      <Col xs={0} lg={10} className="forgot-left">
        <div className="forgot-left-overlay"></div>
        <div className="forgot-left-content">
          <h2 className="forgot-title">KIMEI</h2>
          <p className="forgot-slogan">
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện thực những mục tiêu khát vọng."
          </p>
          <img src="/images/kimei-logo-vertical.png" alt="KIMEI Logo" className="forgot-logo" />
        </div>
      </Col>

      <Col xs={24} lg={14} className="forgot-right">
        <div className="forgot-card">
          <h1 className="forgot-heading">Quên mật khẩu</h1>
          <Form name="forgot" onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="you@example.com" size="large" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} className="forgot-btn">
              Xác nhận
            </Button>
          </Form>

          <p className="forgot-footer-text">
            <Link to="/login" className="forgot-link">
              Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
}
