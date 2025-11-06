import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Form, Input, Checkbox, message } from "antd";
import styled from "styled-components";
import axios from "axios";
import Button from "../common/Button";


// Styled Components
const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const LoginLeft = styled.div`
  display: none;
  position: relative;
  flex: 1;
  background: linear-gradient(135deg, #E0F2FE 0%, #E8E0FE 100%);
  width: 750px;  
  height: 954px;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LoginLeftOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
`;

const LoginLeftContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 32rem;
  padding: 2rem;
`;

const LoginSlogan = styled.p`
  font-size: 1.5rem;
  color: #1e40af;
  font-weight: 500;
  margin-bottom: 2.5rem;
  line-height: 1.75;
  font-style: italic;
`;

const LoginLogo = styled.img`
  width: 25rem;
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1));
`;

const LoginLogoRight = styled.img`
  width: 10rem;
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1));
  margin-bottom: 2rem;
`;

const LoginRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7rem ;
`;

const LoginCard = styled.div`
  background: white;
  width: 100%;
  max-width: 60rem;
  padding: 4rem;
`;

const LoginHeading = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 2rem;
  color: #1e3a8a;
`;

const LoginFlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const LoginLink = styled(Link)`
  color: #2e59ff;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  border-radius: 50px;
  font-weight: 600;
  height: 48px !important;
  font-size: 16px !important;
`;

const LoginFooterText = styled.p`
  text-align: center;
  color: #666;
  margin-top: 10px;
`;

const LoginCopy = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 2.5rem;
`;

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
      navigate("/");
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
    <LoginContainer>
      {/* LEFT Illustration */}
      <LoginLeft xs={0} lg={12}>
        <LoginLeftOverlay />
        <LoginLeftContent>
          <LoginSlogan>
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện
            thực những mục tiêu khát vọng."
          </LoginSlogan>
          <LoginLogo
            src="/images/login2.png"
            alt="KWAY Logo"
          />
        </LoginLeftContent>
      </LoginLeft>

      {/* RIGHT Login Form */}
      <LoginRight>
        <LoginCard>
          <LoginLogoRight src="/images/Logo-kways.png" alt="KWAY Logo" />
          <LoginHeading>Đăng nhập</LoginHeading>

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

            <LoginFlexBetween>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ</Checkbox>
              </Form.Item>

              <LoginLink to="/forgot-password">
                Quên mật khẩu?
              </LoginLink>
            </LoginFlexBetween>

            <LoginButton
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Đăng nhập
            </LoginButton>
          </Form>

          <LoginFooterText>
            Chưa có tài khoản?{" "}
            <LoginLink to="/signup">
              Đăng ký
            </LoginLink>
          </LoginFooterText>

          <LoginCopy>© 2025 KWAY. Tất cả quyền được bảo lưu.</LoginCopy>
        </LoginCard>
      </LoginRight>
    </LoginContainer>
  );
}