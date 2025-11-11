import React, { useState, useEffect } from "react";
import {
  Layout,
  List,
  Tag,
  Typography,
  Spin,
  message,
  Button,
  Card,
} from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../utils/constant";
import AppBar from "../components/AppBar";

const { Content } = Layout;
const { Title, Text } = Typography;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      // console.log(user.id);
      if (!token && !user) {
        message.warning("Bạn cần đăng nhập để xem câu hỏi của mình");
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/questions?filters[user][$eq]=${user.id}&populate=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setQuestions(res.data.data || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
      message.error("Không thể tải câu hỏi");
    } finally {
      setLoading(false);
    }
  };
  console.log(selected);
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("vi-VN", { hour12: false });

  return (
    <>
      <AppBar />
      <Layout
        style={{
          marginTop: 60,
          height: "calc(100vh - 60px)",
          backgroundColor: "#f4f6f8",
          overflow: "hidden",
        }}
      >
        <Content
          style={{
            background: "#fff",
            height: "100%",
            overflowY: "auto",
            padding: 0,
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Spin />
            </div>
          ) : selected ? (
            <div style={{ padding: "30px 50px" }}>
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={() => setSelected(null)}
                style={{ marginBottom: 20 }}
              >
                Quay lại danh sách
              </Button>

              {/* --- Thông tin câu hỏi của user --- */}
              <Card
                style={{
                  borderRadius: 10,
                  marginBottom: 30,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <Text strong style={{ fontSize: 15 }}>
                      {selected.name}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {selected.email}
                    </Text>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {formatDate(selected.createdAt)}
                    </Text>
                    <br />
                    <Tag
                      color={
                        selected.reqStatus === "Đã phản hồi"
                          ? "green"
                          : "orange"
                      }
                      style={{ marginTop: 4 }}
                    >
                      {selected.reqStatus}
                    </Tag>
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: selected.message }}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    marginTop: 12,
                    whiteSpace: "pre-wrap",
                  }}
                />
              </Card>

              {/* --- Phản hồi của admin --- */}
              {selected.answer && (
                <>
                  <span>Phản hồi của Admin</span>
                  <Card
                    style={{
                      borderRadius: 10,
                      background: "#fcfcfc",
                      padding: 24,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <div>
                        <Text strong style={{ fontSize: 15 }}>
                          Kways - Kimei Global
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          vtrung@yopmail.com
                        </Text>
                      </div>
                      <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {formatDate(selected.answer.createdAt)}
                        </Text>
                      </div>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: selected.answer.message,
                      }}
                      style={{
                        fontSize: 15,
                        lineHeight: 1.6,
                        marginTop: 8,
                        marginBottom: 30,
                      }}
                    />
                  </Card>
                </>
              )}
            </div>
          ) : (
            // Danh sách câu hỏi (Inbox view)
            <div>
              <div
                style={{
                  padding: "20px 30px",
                  borderBottom: "1px solid #eee",
                  backgroundColor: "#fafafa",
                }}
              >
                <Title level={4} style={{ margin: 0, marginTop: 12 }}>
                  Hộp thư câu hỏi 💬
                </Title>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {questions.length} yêu cầu
                </Text>
              </div>

              <List
                itemLayout="horizontal"
                dataSource={questions}
                renderItem={(item) => (
                  console.log("item", item),
                  (
                    <List.Item
                      onClick={() => setSelected(item)}
                      style={{
                        cursor: "pointer",
                        padding: "16px 30px",
                        borderBottom: "1px solid #f0f0f0",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#fafafa")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <List.Item.Meta
                        title={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Text strong>{item.name}</Text>
                            <Tag
                              color={
                                item.reqStatus === "Đã phản hồi"
                                  ? "green"
                                  : "orange"
                              }
                              style={{ margin: 0 }}
                            >
                              {item.reqStatus}
                            </Tag>
                          </div>
                        }
                        description={
                          <>
                            <Text
                              type="secondary"
                              style={{
                                fontSize: 13,
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "90%",
                              }}
                            >
                              {item.message.replace(/<[^>]+>/g, "")}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatDate(item.createdAt)}
                            </Text>
                          </>
                        }
                      />
                    </List.Item>
                  )
                )}
              />
            </div>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default Questions;
