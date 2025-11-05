import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, message, Upload } from "antd";
import "./Signup.css";
import axios from "axios";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewUrl(file.url || file.preview);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể tải lên JPG/PNG!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
      return false;
    }

    setAvatarFile(file);
    const preview = await getBase64(file);
    setPreviewUrl(preview);
    return false;
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // First upload avatar if exists
      let avatarId = null;
      if (avatarFile) {
        const formData = new FormData();
        formData.append("files", avatarFile);

        const uploadRes = await axios.post("http://localhost:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadRes.data && uploadRes.data[0]) {
          avatarId = uploadRes.data[0].id;
        }
      }

      // Then register user
      const res = await axios.post("http://localhost:1337/api/auth/local/register", {
        username: values.fullName,
        email: values.email,
        password: values.password,
        avatar: avatarId, // Link avatar to user
      });

      const { jwt, user } = res.data;
      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      message.success("Đăng ký thành công!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.error?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* LEFT Illustration */}
      <div className="signup-left">
        <div className="signup-left-overlay"></div>
        <div className="signup-left-content">
          <h2 className="signup-title">KIMEI</h2>
          <p className="signup-slogan">
            "Một tổ chức có hiệu suất cao khi trao quyền cho đội ngũ..."
          </p>
          <img
            src="/images/kimei-logo-vertical.png"
            alt="KIMEI Logo"
            className="signup-logo"
          />
        </div>
      </div>

      {/* RIGHT Signup Form */}
      <div className="signup-right">
        <div className="signup-card">
          <h1 className="signup-heading">Đăng ký</h1>

          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="avatar"
              label={
                <span className="upload-label">
                  Ảnh đại diện
                  <span className="upload-optional">(Tùy chọn)</span>
                </span>
              }
            >
              <div className="avatar-upload-container">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                >
                  {previewUrl ? (
                    <div className="avatar-preview">
                      <img src={previewUrl} alt="Avatar" />
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
                      <div className="upload-text">Tải ảnh lên</div>
                    </div>
                  )}
                </Upload>
                {previewUrl && (
                  <Button 
                    type="link" 
                    onClick={() => {
                      setPreviewUrl('');
                      setAvatarFile(null);
                    }}
                    className="remove-avatar"
                  >
                    Xóa ảnh
                  </Button>
                )}
              </div>
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

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="signup-btn"
            >
              Đăng ký
            </Button>
          </Form>

          <p className="signup-footer-text">
            Đã có tài khoản?{" "}
            <Link to="/login" className="signup-link">
              Đăng nhập
            </Link>
          </p>

          <p className="signup-copy">© 2025 KIMEI. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}

module.exports = {
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxSize: 2 * 1024 * 1024, // 2MB in bytes
        },
      },
    },
  },
};