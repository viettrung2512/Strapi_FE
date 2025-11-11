import { useEffect } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../utils/constant";

const { TextArea } = Input;

const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  transition: all 0.3s ease;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1440px) {
    max-width: 1280px;
  }
`;

const LeftPanel = styled.div`
  background: linear-gradient(to bottom right, #60a5fa, #2563eb);
  color: white;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 24px;
    line-height: 1.3;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.6;
    opacity: 0.95;
    margin-bottom: 24px;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  @media (min-width: 1200px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.125rem;
    }
    img {
      width: 100%;
    }
  }
`;

const ContactModal = ({ visible, onClose }) => {
  const { user } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      // Hide scrollbar when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrollbar when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await axios.post(
        `${API_URL}/api/questions`,
        {
          data: {
            name: values.name,
            email: values.email,
            phoneNumber: values.phone,
            message: values.message,
            reqStatus: "Đang xử lý",
            user: user.id,
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
      onClose(); // Close modal after successful submission
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
      width="90%"
      style={{ maxWidth: "1200px" }}
      bodyStyle={{ padding: 0, height: "80vh" }}
      centered
    >
      <Card>
        <LeftPanel>
          <h1>
            Start with a <span style={{ color: "white" }}>FREE</span>
            <br />
            Consultation today!
          </h1>

          <p
            style={{
              fontSize: "1.125rem",
              marginBottom: "32px",
              opacity: 0.95,
              lineHeight: 1.6,
            }}
          >
            Ready to transform your business with innovative technology
            solutions? KIMEI Global delivers practical solutions and expert
            guidance to align your digital team with business goals
          </p>

          <p
            style={{
              fontSize: "1rem",
              opacity: 0.9,
              marginBottom: "32px",
            }}
          >
            Drop us a message, and we'll get back to you within 1 - 3 business
            days!
          </p>

          {/* Illustration Placeholder */}
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
        </LeftPanel>
        {/* Right Form Section */}
        <div style={{ padding: "40px 48px" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              name: user?.username || "",
              email: user?.email || "",
            }}
          >
            {/* Name and Phone Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "16px",
                "@media (min-width: 768px)": {
                  gridTemplateColumns: "1fr 1fr",
                },
              }}
            >
              <Form.Item
                name="name"
                label="Your name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone number"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  { validator: validatePhone },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </div>

            {/* Email Row */}
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="yourname@gmail.com" />
            </Form.Item>

            {/* Message Textarea */}
            <Form.Item name="message" label="Message">
              <TextArea placeholder="Tell us about your needs" rows={5} />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  background: "#2563eb",
                  borderColor: "#2563eb",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </Modal>
  );
};

export default ContactModal;
