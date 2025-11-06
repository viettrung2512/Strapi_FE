import { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import AvatarUpload from "./AvatarUpload";
import "./Profile.css";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    form.setFieldsValue({
      fullName: user.username,
      email: user.email,
    });
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let avatarId = user.avatar;
      if (avatarFile) {
        const formData = new FormData();
        formData.append("files", avatarFile);

        const uploadRes = await axios.post(
          "http://localhost:1337/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (uploadRes.data && uploadRes.data[0]) {
          avatarId = uploadRes.data[0].id;
        }
      }

      await axios.put(
        `http://localhost:1337/api/users/${user.id}`,
        {
          username: values.fullName,
          avatar: avatarId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      message.success("Cập nhật thông tin thành công!");
    } catch (err) {
      message.error("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-heading">Cập nhật thông tin</h1>

        <Form
          form={form}
          name="profile"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item label="Ảnh đại diện">
            <AvatarUpload 
              onAvatarChange={setAvatarFile}
              initialImage={user.avatar?.url}
            />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input prefix={<UserOutlined />} size="large" />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input prefix={<UserOutlined />} disabled size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="profile-btn"
          >
            Cập nhật
          </Button>
        </Form>
      </div>
    </div>
  );
}