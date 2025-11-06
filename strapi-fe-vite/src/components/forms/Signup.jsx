import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Form, Input, message } from "antd";
import styled from "styled-components";
import axios from "axios";
import AvatarUpload from "../common/AvatarUpload";
import Button from "../common/Button";


// Styled Components
const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const SignupLeft = styled.div`
  display: none;
  position: relative;
  flex: 1;
  background: linear-gradient(135deg, #E0F2FE 0%, #E8E0FE 100%);

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SignupLeftOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
`;

const SignupLeftContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 32rem;
  padding: 2rem;
`;

const SignupSlogan = styled.p`
  font-size: 1.5rem;
  color: #1e40af;
  font-weight: 500;
  margin-bottom: 2.5rem;
  line-height: 1.75;
  font-style: italic;
`;

const SignupLogo = styled.img`
  width: 25rem;
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1));
`;

const SignupLogoRight = styled.img`
  width: 10rem;
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1));
  margin-bottom: 2rem;
`;

const SignupRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem ;
`;

const SignupCard = styled.div`
  width: 100%;
  max-width: 60rem;
  padding: 4rem;
  background: white;
  border-radius: 1rem;
`;

const SignupHeading = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 2rem;
  color: #1e3a8a;
`;

const SignupButton = styled(Button)`
  width: 100%;
  border-radius: 50px;
  font-weight: 600;
  height: 48px !important;
  font-size: 16px !important;
`;

const SignupFooterText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
`;

const SignupLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignupCopy = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 2.5rem;
`;

const UploadLabel = styled.span`
  font-size: 16px;
  color: #1f2937;
  margin-center: 8px;
`;

const UploadOptional = styled.span`
  margin-center: 8px;
  font-size: 14px;
  color: #6b7280;
  font-weight: normal;
`;

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("🚀 Starting registration process...");
      const res = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: values.fullName,
          email: values.email,
          password: values.password,
        }
      );

      const { jwt, user } = res.data;
      console.log("✅ User registered successfully:", user.id);

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      if (avatarFile) {
        try {
          console.log("📸 Uploading avatar...");
          const formData = new FormData();
          formData.append("files", avatarFile);
          formData.append("field", "avatar");

          const uploadRes = await axios.post(
            "http://localhost:1337/api/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          if (uploadRes.data && uploadRes.data[0]) {
            const avatarId = uploadRes.data[0].id;
            console.log("✅ Avatar uploaded, ID:", avatarId);
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
    <SignupContainer>
      {/* LEFT Illustration */}
      <SignupLeft xs={0} lg={12}>
        <SignupLeftOverlay />
        <SignupLeftContent>
          <SignupSlogan>
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện
            thực những mục tiêu khát vọng."
          </SignupSlogan>
          <SignupLogo
            src="/images/login2.png"
            alt="KWAY Logo"
          />
        </SignupLeftContent>
      </SignupLeft>

      {/* RIGHT Signup Form */}
      <SignupRight>
        <SignupCard>
          <SignupLogoRight src="/images/Logo-kways.png" alt="KWAY Logo" />
          <SignupHeading>Đăng ký</SignupHeading>

          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="avatar"
              label={
                <UploadLabel>
                  Ảnh đại diện
                  <UploadOptional>(Tùy chọn)</UploadOptional>
                </UploadLabel>
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

            <SignupButton
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Đăng ký
            </SignupButton>
          </Form>

          <SignupFooterText>
            Đã có tài khoản?{" "}
            <SignupLink to="/login">
              Đăng nhập
            </SignupLink>
          </SignupFooterText>

          <SignupCopy>© 2025 KIMEI. Tất cả quyền được bảo lưu.</SignupCopy>
        </SignupCard>
      </SignupRight>
    </SignupContainer>
  );
}