import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, message, Tabs, Card, Spin } from "antd"; // ✅ Thêm Spin
import {
  UserOutlined,
  LockOutlined,
  SafetyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import AvatarUpload from "../common/AvatarUpload";
import Button from "../common/Button";
import { API_URL } from "../../utils/constant";
import { useAuth } from "../../contexts/AuthContext";
import AppBar from "../AppBar";

// Styled Components
const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-top: 90px; /* Account for fixed AppBar */
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 90px);
  padding: 2rem 1rem;
`;

const ProfileCard = styled.div`
  width: 48rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  
  @media (max-width: 750px) {
    width: 100%;
    max-width: 48rem;
  }
`;

const ProfileHeading = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-align: left;
  margin-bottom: 2rem;
  color: #1e3a8a;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeButton = styled(Button)`
  border-radius: 50px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  padding: 8px 16px !important;
`;

const ProfileButton = styled(Button)`
  width: 100%;
  height: 48px !important;
  border-radius: 50px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 500;
    padding: 12px 16px;
  }

  .ant-tabs-tab-btn {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ant-tabs-ink-bar {
    background: linear-gradient(to right, #2e59ff, #5145ff);
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #2e59ff;
  }
`;

const TabContent = styled.div`
  height: 520px;
  overflow-y: auto;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlertMessage = styled.div`
  padding: 12px 16px;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f7ff 100%);
  border: 1px solid #91d5ff;
  border-radius: 8px;
  margin-bottom: 1rem;
  color: #096dd9;
  border-left: 4px solid #2e59ff;
`;

const UserInfoSection = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
`;

const UserAvatarSection = styled.div`
  max-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const AvatarLabel = styled.div`
  font-size: 14px;
  color: #64748b;
  text-align: center;
  margin-top: -1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  useEffect(() => {
    // ✅ Kiểm tra user tồn tại trước khi set form values
    if (user) {
      form.setFieldsValue({
        fullName: user.username || '',
        email: user.email || '',
      });

      if (user.avatar && user.avatar.url) {
        setCurrentAvatar(`${API_URL}${user.avatar.url}`);
      } else {
        setCurrentAvatar(null);
      }
    }
  }, [user, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("Vui lòng đăng nhập lại!");
        return;
      }

      // ✅ Kiểm tra user tồn tại
      if (!user || !user.id) {
        message.error("Không tìm thấy thông tin người dùng!");
        return;
      }

      let avatarId = user.avatar?.id;
      let avatarUrl = user.avatar?.url;

      // Upload avatar nếu có
      if (avatarFile) {
        const formData = new FormData();
        formData.append("files", avatarFile);

        const uploadRes = await axios.post(
          `${API_URL}/api/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (uploadRes.data && uploadRes.data[0]) {
          avatarId = uploadRes.data[0].id;
          avatarUrl = uploadRes.data[0].url;
          setCurrentAvatar(`${API_URL}${avatarUrl}`);
        }
      }

      const updateData = {
        username: values.fullName,
      };

      if (avatarFile) {
        updateData.avatar = avatarId;
      }

      console.log("Sending update data:", updateData);
      console.log("User ID:", user.id);
      
      await axios.put(
        `${API_URL}/api/users/${user.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Cập nhật AuthContext và localStorage
      const updatedUser = {
        ...user,
        username: values.fullName,
        avatar: {
          id: avatarId,
          url: avatarUrl
        }
      };

      updateUser(updatedUser);

      message.success("Cập nhật thông tin thành công!");
      setAvatarFile(null);
      navigate("/");
    } catch (err) {
      console.error("Update error:", err);
      console.error("Error response:", err.response?.data);

      if (err.response?.status === 401) {
        message.error("Token hết hạn! Vui lòng đăng nhập lại.");
        navigate("/login");
      } else if (err.response?.status === 403) {
        message.error("Không có quyền cập nhật user!");
      } else {
        message.error(
          `Cập nhật thất bại: ${
            err.response?.data?.error?.message || err.message
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Đổi mật khẩu
  const onPasswordFinish = async (values) => {
    setPasswordLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/auth/change-password`, // ✅ Đã sửa template literal
        {
          currentPassword: values.currentPassword,
          password: values.newPassword,
          passwordConfirmation: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      message.success("Đổi mật khẩu thành công!");
      passwordForm.resetFields();
      navigate("/");
    } catch (err) {
      console.error("Change password error:", err);
      message.error(
        err.response?.data?.error?.message || "Đổi mật khẩu thất bại!"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarChange = (file) => {
    setAvatarFile(file);
  };

  // ✅ Hiển thị loading nếu user chưa được load
  if (!user) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <>
      <AppBar />
      <ProfileContainer>
        <ProfileWrapper>
          <ProfileCard>
            <ProfileHeading>
              <span>Cập nhật thông tin</span>
              <HomeButton
                type="default"
                icon={<HomeOutlined />}
                onClick={() => navigate("/")}
              >
                Trang chủ
              </HomeButton>
            </ProfileHeading>

          <StyledTabs
            defaultActiveKey="profile"
            items={[
              {
                key: "profile",
                label: (
                  <span>
                    <UserOutlined />
                    Thông tin cá nhân
                  </span>
                ),
                children: (
                  <TabContent>
                    <FormContent>
                      <UserAvatarSection>
                        <AvatarLabel>Avatar hiện tại</AvatarLabel>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1.5rem",
                          }}
                        >
                          <AvatarUpload
                            onAvatarChange={handleAvatarChange}
                            initialImage={currentAvatar}
                            showPreview={true}
                          />
                        </div>
                      </UserAvatarSection>

                      <Form
                        form={form}
                        name="profile"
                        onFinish={onFinish}
                        layout="vertical"
                      >
                        <UserInfoSection>
                          <Form.Item
                            name="fullName"
                            label="Họ và tên"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập họ và tên!",
                              },
                            ]}
                          >
                            <Input
                              prefix={<UserOutlined />}
                              placeholder="Nhập họ và tên"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item name="email" label="Email">
                            <Input
                              prefix={<UserOutlined />}
                              disabled
                              size="large"
                            />
                          </Form.Item>
                        </UserInfoSection>

                        <ProfileButton
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                        >
                          Cập nhật thông tin
                        </ProfileButton>
                      </Form>
                    </FormContent>
                  </TabContent>
                ),
              },
              {
                key: "password",
                label: (
                  <span>
                    <LockOutlined />
                    Đổi mật khẩu
                  </span>
                ),
                children: (
                  <TabContent>
                    <FormContent>
                      <AlertMessage>
                        <SafetyOutlined /> Để bảo vệ tài khoản của bạn, vui lòng
                        sử dụng mật khẩu mạnh và không chia sẻ với người khác.
                      </AlertMessage>

                      <Form
                        form={passwordForm}
                        name="password"
                        onFinish={onPasswordFinish}
                        layout="vertical"
                      >
                        <UserInfoSection>
                          <SectionTitle>
                            <LockOutlined />
                            Thay đổi mật khẩu
                          </SectionTitle>

                          <Form.Item
                            name="currentPassword"
                            label="Mật khẩu hiện tại"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập mật khẩu hiện tại!",
                              },
                            ]}
                          >
                            <Input.Password
                              prefix={<LockOutlined />}
                              placeholder="Nhập mật khẩu hiện tại"
                              size="large"
                              iconRender={(visible) =>
                                visible ? (
                                  <EyeInvisibleOutlined />
                                ) : (
                                  <EyeOutlined />
                                )
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            name="newPassword"
                            label="Mật khẩu mới"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới!",
                              },
                              {
                                min: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue("currentPassword") !== value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error("Mật khẩu mới không được trùng với mật khẩu hiện tại!")
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password
                              prefix={<LockOutlined />}
                              placeholder="Nhập mật khẩu mới"
                              size="large"
                              iconRender={(visible) =>
                                visible ? (
                                  <EyeInvisibleOutlined />
                                ) : (
                                  <EyeOutlined />
                                )
                              }
                            />
                          </Form.Item>

                          <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu mới"
                            dependencies={["newPassword"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng xác nhận mật khẩu mới!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("newPassword") === value
                                  ) {
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
                              iconRender={(visible) =>
                                visible ? (
                                  <EyeInvisibleOutlined />
                                ) : (
                                  <EyeOutlined />
                                )
                              }
                            />
                          </Form.Item>
                        </UserInfoSection>

                        <ProfileButton
                          type="primary"
                          htmlType="submit"
                          loading={passwordLoading}
                        >
                          Đổi mật khẩu
                        </ProfileButton>
                      </Form>
                    </FormContent>
                  </TabContent>
                ),
              },
            ]}
          />
          </ProfileCard>
        </ProfileWrapper>
      </ProfileContainer>
    </>
  );
}
