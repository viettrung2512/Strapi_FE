import { useState } from "react";
import { Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import axios from "axios";
import { API_URL } from "../../utils/constant";

// Styled Components
const ForgotContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const ForgotLeft = styled.div`
  display: none;
  position: relative;
  flex: 1;
  background: linear-gradient(135deg, #e0f2fe 0%, #e8e0fe 100%);
  width: 750px;
  height: 954px;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ForgotLeftOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(79, 70, 229, 0.1) 100%
  );
`;

const ForgotLeftContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 32rem;
  padding: 2rem;
`;

const ForgotSlogan = styled.p`
  font-size: 1.5rem;
  color: #1e40af;
  font-weight: 500;
  margin-bottom: 2.5rem;
  line-height: 1.75;
  font-style: italic;
`;

const ForgotLogo = styled.img`
  width: 25rem;
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1));
`;

const ForgotLogoRight = styled.img`
  width: 10rem;
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1));
  margin-bottom: 2rem;
`;

const ForgotRight = styled.div`
  flex: 1;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 7rem;
`;

const ForgotCard = styled.div`
  width: 100%;
  max-width: 60rem;
  padding: 4rem;
  background: white;
`;

const ForgotHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: left;
  margin-bottom: 2rem;
  color: #1e3a8a;
`;

const ForgotButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  height: 48px !important;
  border-radius: 50px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
`;

const ForgotFooterText = styled.p`
  text-align: start;
  margin-top: 1.5rem;
`;

const ForgotLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const url = `${API_URL}/api/auth/forgot-password`;

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
      message.success("Vui lòng kiểm tra email để đặt lại mật khẩu!");
      form.resetFields();
    } catch (error) {
      message.error("Không gửi được email. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotContainer>
      {/* LEFT Illustration */}
      <ForgotLeft xs={0} lg={12}>
        <ForgotLeftOverlay />
        <ForgotLeftContent>
          <ForgotSlogan>
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện
            thực những mục tiêu khát vọng."
          </ForgotSlogan>
          <ForgotLogo src="/images/login2.png" alt="KWAY Logo" />
        </ForgotLeftContent>
      </ForgotLeft>

      {/* RIGHT Form */}
      <ForgotRight>
        <ForgotCard>
          <ForgotLogoRight src="/images/Logo-kways.png" alt="KWAY Logo" />
          <ForgotHeading>Quên mật khẩu</ForgotHeading>
          <Form name="forgot" onFinish={onFinish} layout="vertical" form={form}>
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

            <ForgotButton type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </ForgotButton>
          </Form>

          <ForgotFooterText>
            <ForgotLink to="/login">Quay lại đăng nhập</ForgotLink>
          </ForgotFooterText>
        </ForgotCard>
      </ForgotRight>
    </ForgotContainer>
  );
}
