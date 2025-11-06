import { useState, useEffect } from "react";
import { Form, Input, message, Row, Col, Alert } from "antd";
import { LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState({
    level: 0,
    text: "",
    className: ""
  });

  useEffect(() => {
    const token = searchParams.get("code");
    if (token) {
      setCode(token);
      setIsValidCode(true);
    } else {
      setIsValidCode(false);
      message.error("Link reset password không hợp lệ!");
    }
  }, [searchParams]);

  // Kiểm tra độ mạnh mật khẩu
  const checkPasswordStrength = (password) => {
    if (!password) {
      return { level: 0, text: "", className: "" };
    }

    let score = 0;
    
    // Độ dài
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Chữ hoa/chữ thường
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    
    // Số
    if (/\d/.test(password)) score += 1;
    
    // Ký tự đặc biệt
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    if (score <= 2) {
      return { level: 1, text: "Yếu", className: "strength-weak" };
    } else if (score <= 4) {
      return { level: 2, text: "Trung bình", className: "strength-medium" };
    } else {
      return { level: 3, text: "Mạnh", className: "strength-strong" };
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordStrength(checkPasswordStrength(password));
  };

  const validateNewPassword = async (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Vui lòng nhập mật khẩu mới!'));
    }

    if (value.length < 6) {
      return Promise.reject(new Error('Mật khẩu phải có ít nhất 6 ký tự!'));
    }

    return Promise.resolve();
  };

  const onFinish = async (values) => {
    if (!code) {
      message.error("Link reset password không hợp lệ!");
      return;
    }

    setLoading(true);
    try {
      console.log("🔄 Resetting password with token");

      const response = await axios.post(
        "http://localhost:1337/api/auth/reset-password",
        {
          code: code,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Reset password success:", response.data);
      message.success("🎉 Đổi mật khẩu thành công! Đang chuyển hướng...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      console.error("❌ Reset password error:", err.response?.data);
      
      const errorMessage = err.response?.data?.error?.message;
      
      if (errorMessage?.includes("token") || errorMessage?.includes("code")) {
        message.error("Link reset password đã hết hạn hoặc không hợp lệ!");
        setIsValidCode(false);
      } else if (errorMessage?.includes("same") || errorMessage?.includes("previous")) {
        message.error("Mật khẩu mới không được trùng với mật khẩu cũ!");
      } else {
        message.error(errorMessage || "Lỗi đổi mật khẩu!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isValidCode) {
    return (
      <Row className="reset-container">
        <Col xs={0} lg={10} className="reset-left">
          <div className="reset-left-overlay"></div>
          <div className="reset-left-content">
            <h2 className="reset-title">KIMEI</h2>
            <p className="reset-slogan">
              "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện thực những mục tiêu khát vọng."
            </p>
            <img src="/images/kimei-logo-vertical.png" alt="KIMEI Logo" className="reset-logo" />
          </div>
        </Col>

        <Col xs={24} lg={14} className="reset-right">
          <div className="reset-card">
            <h1 className="reset-heading">Link Không Hợp Lệ</h1>
            <p className="reset-subheading">
              Link reset password đã hết hạn hoặc không hợp lệ
            </p>
            
            <Alert
              message="Yêu cầu không thành công"
              description="Link reset password của bạn đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu reset mật khẩu."
              type="error"
              showIcon
              className="alert-container"
            />

            <Button 
              type="primary" 
              onClick={() => navigate("/forgot-password")}
              className="reset-btn"
            >
              Gửi Lại Yêu Cầu Reset
            </Button>

            <p className="reset-footer-text">
              <Link to="/login" className="reset-link">
                Quay lại đăng nhập
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="reset-container">
      <Col xs={0} lg={10} className="reset-left">
        <div className="reset-left-overlay"></div>
        <div className="reset-left-content">
          <h2 className="reset-title">KIMEI</h2>
          <p className="reset-slogan">
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện thực những mục tiêu khát vọng."
          </p>
          <img src="/images/kimei-logo-vertical.png" alt="KIMEI Logo" className="reset-logo" />
        </div>
      </Col>

      <Col xs={24} lg={14} className="reset-right">
        <div className="reset-card">
          <h1 className="reset-heading">Đặt Lại Mật Khẩu</h1>
          <p className="reset-subheading">
            Vui lòng nhập mật khẩu mới cho tài khoản của bạn
          </p>

          <Alert
            message="Thiết lập mật khẩu mới"
            description="Mật khẩu mới phải khác với mật khẩu cũ và có ít nhất 6 ký tự."
            type="info"
            showIcon
            className="alert-container"
          />

          <Form 
            name="reset" 
            onFinish={onFinish} 
            layout="vertical" 
            form={form}
          >
            <Form.Item
              name="password"
              label="Mật khẩu mới"
              rules={[
                { validator: validateNewPassword }
              ]}
              extra={
                passwordStrength.level > 0 && (
                  <div className="password-strength">
                    <div>Độ mạnh mật khẩu:</div>
                    <div className={`strength-bar ${passwordStrength.className}`}></div>
                    <div className="strength-text">{passwordStrength.text}</div>
                  </div>
                )
              }
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu mới"
                size="large"
                onChange={handlePasswordChange}
              />
            </Form.Item>

            <Form.Item
              name="passwordConfirmation"
              label="Xác nhận mật khẩu"
              dependencies={['password']}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Xác nhận mật khẩu mới"
                size="large"
              />
            </Form.Item>

            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              className="reset-btn"
              icon={<SafetyCertificateOutlined />}
            >
              Đổi Mật Khẩu
            </Button>
          </Form>

          <p className="reset-footer-text">
            <Link to="/login" className="reset-link">
              Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
}