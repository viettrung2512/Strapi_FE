import { useEffect } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { getToken } from "firebase/messaging";
import { messaging } from "../utils/firebase";
import { VAPID_KEY } from "../utils/constant";

const { TextArea } = Input;

const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  height: auto;
  min-height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: 80vh;
    min-height: 600px;
    overflow-y: auto;
  }

  @media (min-width: 1440px) {
    max-width: 1280px;px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
    min-height: 500px;
  }
`;

const LeftPanel = styled.div`
  background: linear-gradient(to bottom right, #60a5fa, #2563eb);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: start center;
  align-items: center;
  text-align: center;
  gap: 20px;
  min-height: 300px;

  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 16px;
    min-height: 200px;
    flex-shrink: 0;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    padding: 32px 24px;
    gap: 24px;
  }

  @media (min-width: 993px) {
    padding: 40px 32px;
    height: 600px;

    gap: 32px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    font-size: 2rem;
  }

  @media (min-width: 993px) {
    font-size: 2.2rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.95;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.4;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    font-size: 1.05rem;
  }

  @media (min-width: 993px) {
    font-size: 1.1rem;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: white;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px 16px;
    flex: 1;
    min-height: 0;
  }

  @media (min-width: 769px) and (max-width: 992px) {
    padding: 0 24px;
  }

  @media (min-width: 993px) {
    padding: 15px 32px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const FullWidthItem = styled.div`
  grid-column: 1 / -1;
`;

const ContactModal = ({ visible, onClose, onAddQuestion = () => {} }) => {
  const { user } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    let fcmToken = null;
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("Đã được cấp quyền nhận thông báo.");
        fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
        console.log("FCM Token:", fcmToken);
      } else {
        console.warn("Người dùng không cho phép nhận thông báo.");
      }
    } catch (fcmError) {
      console.error("Lỗi khi lấy FCM token:", fcmError);
    }

    try {
      await axios.post(
        `${API_URL}/api/questions`,
        {
          data: {
            name: values.name,
            email: values.email,
            phoneNumber: values.phone,
            message: values.message,
            user: user.id,
            fcmToken: fcmToken,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Cảm ơn bạn đã gửi phản hồi!");
      form.resetFields();
      onAddQuestion?.();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error(
        error.response?.data?.error?.message ||
          "Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại!"
      );
    }
  };

  const validatePhone = (_, value) => {
    const phoneRegex = /^0[3-9]\d{8}$/;
    if (!value || phoneRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Số điện thoại không hợp lệ!"));
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="95%"
      style={{
        maxWidth: "1200px",
      }}
      styles={{
        body: {
          padding: 0,
          height: "auto",
          maxHeight: "90vh",
          overflow: "hidden",
        },
      }}
      centered
    >
      <Card>
        <LeftPanel>
          <ContentWrapper>
            <div>
              <Title>
                Start with a <span style={{ color: "white" }}>FREE</span>
                <br />
                Consultation today!
              </Title>
            </div>

            <div>
              <Description>
                Ready to transform your business with innovative technology
                solutions? KIMEI Global delivers practical solutions and expert
                guidance to align your digital team with business goals
              </Description>
            </div>

            <div
              style={{
                width: "100%",
                height: "256px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/contact.png"
                alt="contact"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </ContentWrapper>
        </LeftPanel>

        <RightPanel>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              name: user?.username || "",
              email: user?.email || "",
            }}
            style={{ width: "100%" }}
          >
            <FormGrid>
              <FullWidthItem>
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  labelCol={{ style: { fontWeight: "600" } }}
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input size="large" placeholder="Enter your name" />
                </Form.Item>
              </FullWidthItem>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                labelCol={{ style: { fontWeight: "600" } }}
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  { validator: validatePhone },
                ]}
              >
                <Input size="large" placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                labelCol={{ style: { fontWeight: "600" } }}
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input size="large" placeholder="yourname@gmail.com" />
              </Form.Item>
            </FormGrid>

            <Form.Item name="message" label="Message">
              <TextArea
                placeholder="Tell us about your needs"
                rows={10}
                style={{
                  resize: "vertical",
                  minHeight: "200px",
                  fontWWeight: "600",
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  width: "100%",
                  background: "#2563eb",
                  borderColor: "#2563eb",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Gửi câu hỏi
              </Button>
            </Form.Item>
          </Form>
        </RightPanel>
      </Card>
    </Modal>
  );
};

export default ContactModal;
