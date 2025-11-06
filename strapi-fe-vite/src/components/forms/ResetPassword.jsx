import { useState, useEffect } from "react";
import { Form, Input, message, Row, Col, Alert } from "antd";
import { LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import axios from "axios";

// Styled Components
const ResetContainer = styled(Row)`
  min-height: 100vh;
  overflow: hidden;
`;

const ResetLeft = styled(Col)`
  background: linear-gradient(135deg, #E0F2FE 0%, #E8E0FE 100%);
  position: relative;
  display: none;
  flex: 1;
  width: 750px;
  height: 954px;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ResetLeftOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(79, 70, 229, 0.1) 100%
  );
`;

const ResetLeftContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 32rem;
  padding: 2rem;
`;

const ResetSlogan = styled.p`
  font-size: 1.5rem;
  color: #1e40af;
  font-weight: 500;
  margin-bottom: 2.5rem;
  line-height: 1.75;
  font-style: italic;
`;

const ResetLogo = styled.img`
  width: 25rem;
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.1));
`;

const ResetRight = styled(Col)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7rem ;
`;

const ResetCard = styled.div`
  align-items: center;
  width: 100%;
  max-width: 32rem;
  padding: 2.5rem;
  background: white;

  @media (max-width: 992px) {
    padding: 2rem;
  }
`;

const ResetHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: start;
  margin-bottom: 1rem;
  color: #1e3a8a;
`;

const ResetButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  height: 48px !important;
  border-radius: 50px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
`;

const ResetFooterText = styled.p`
  text-align: start;
  margin-top: 1.5rem;
`;

const ResetLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AlertContainer = styled.div`
  margin-bottom: 1.5rem;
  text-align: start;
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  text-align: start;
`;

const StrengthBar = styled.div`
  height: 4px;
  border-radius: 2px;
  margin-top: 0.25rem;
  transition: all 0.3s ease;
  width: ${(props) => {
    switch (props.strength) {
      case 1:
        return "33%";
      case 2:
        return "66%";
      case 3:
        return "100%";
      default:
        return "0%";
    }
  }};
  background: ${(props) => {
    switch (props.strength) {
      case 1:
        return "#ff4d4f";
      case 2:
        return "#faad14";
      case 3:
        return "#52c41a";
      default:
        return "#f0f0f0";
    }
  }};
`;

const StrengthText = styled.div`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: #666;
`;

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("");

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

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordStrength(strength.level);
    setStrengthText(strength.text);
  };

  const validateNewPassword = async (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Vui lòng nhập mật khẩu mới!"));
    }

    if (value.length < 6) {
      return Promise.reject(new Error("Mật khẩu phải có ít nhất 6 ký tự!"));
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
      } else if (
        errorMessage?.includes("same") ||
        errorMessage?.includes("previous")
      ) {
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
      <ResetContainer>
        <ResetLeft xs={0} lg={12}>
          <ResetLeftOverlay />
          <ResetLeftContent>
            <ResetSlogan>
              "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện
              thực những mục tiêu khát vọng."
            </ResetSlogan>
            <ResetLogo src="/images/login2.png" alt="KWAY Logo" />
          </ResetLeftContent>
        </ResetLeft>

        <ResetRight>
          <ResetCard>
            <ResetHeading>Link Không Hợp Lệ</ResetHeading>
            <Alert
              message="Yêu cầu không thành công"
              description="Link reset password của bạn đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu reset mật khẩu."
              type="error"
              showIcon
              className="alert-container"
            />

            <ResetButton
              type="primary"
              onClick={() => navigate("/forgot-password")}
            >
              Gửi Lại Yêu Cầu Reset
            </ResetButton>

            <ResetFooterText>
              <ResetLink to="/login">Quay lại đăng nhập</ResetLink>
            </ResetFooterText>
          </ResetCard>
        </ResetRight>
      </ResetContainer>
    );
  }

  return (
    <ResetContainer>
      <ResetLeft xs={0} lg={12}>
        <ResetLeftOverlay />
        <ResetLeftContent>
          <ResetSlogan>
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ để hiện
            thực những mục tiêu khát vọng."
          </ResetSlogan>
          <ResetLogo src="/images/login2.png" alt="KWAY Logo" />
        </ResetLeftContent>
      </ResetLeft>

      <ResetRight>
        <ResetCard>
          <ResetHeading>Đặt Lại Mật Khẩu</ResetHeading>
          <Alert
            message="Thiết lập mật khẩu mới"
            description="Mật khẩu mới phải khác với mật khẩu cũ và có ít nhất 6 ký tự."
            type="info"
            showIcon
            className="alert-container"
          />

          <Form name="reset" onFinish={onFinish} layout="vertical" form={form}>
            <Form.Item
              name="password"
              label="Mật khẩu mới"
              rules={[{ validator: validateNewPassword }]}
              extra={
                passwordStrength > 0 && (
                  <PasswordStrength>
                    <div>Độ mạnh mật khẩu:</div>
                    <StrengthBar strength={passwordStrength} />
                    <StrengthText>{strengthText}</StrengthText>
                  </PasswordStrength>
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
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
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

            <ResetButton
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SafetyCertificateOutlined />}
            >
              Đổi Mật Khẩu
            </ResetButton>
          </Form>

          <ResetFooterText>
            <ResetLink to="/login">Quay lại đăng nhập</ResetLink>
          </ResetFooterText>
        </ResetCard>
      </ResetRight>
    </ResetContainer>
  );
}
