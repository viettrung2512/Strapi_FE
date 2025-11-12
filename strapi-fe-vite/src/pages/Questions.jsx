import React, { useState, useEffect } from "react";
import { List, Tag, Typography, Spin, message, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";
import AppBar from "../components/AppBar";
import { db } from "../utils/firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";

const { Content } = Layout;
const { Title, Text } = Typography;

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleString("vi-VN", { hour12: false });
// hàm lấy user id từ localstorage
const getUserId = () => {
  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user?.id ? String(user.id) : null;
    }
    return null;
  } catch (e) {
    console.error("Lỗi lấy user từ localStorage", e);
    return null;
  }
};
// hàm đánh dấu đã đọc
const markNotificationAsRead = async (questionId) => {
  const userId = getUserId();
  if (!userId || !questionId) return;
  const linkToFind = `/questions/${questionId}`;
  try {
    const notifRef = collection(
      db,
      "user_notifications",
      userId,
      "notifications"
    );
    const q = query(
      notifRef,
      where("link", "==", linkToFind),
      where("isRead", "==", false)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return;
    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { isRead: true });
    });
    await batch.commit();
  } catch (error) {
    console.error("Lỗi tự động đánh dấu đã đọc:", error);
  }
};

const Questions = ({ questions, setQuestions }) => {
  // const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [realtimeUpdates, setRealtimeUpdates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setRealtimeUpdates({});
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (!token || !user) {
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

  useEffect(() => {
    if (questions.length === 0) return;

    console.log(
      `[DEBUG] Bắt đầu lắng nghe real-time cho ${questions.length} câu hỏi.`
    );

    const unsubscribers = questions.map((question) => {
      const questionDocRef = doc(db, "questions", String(question.documentId));
      return onSnapshot(questionDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const realtimeData = docSnap.data();
          setRealtimeUpdates((prevUpdates) => ({
            ...prevUpdates,
            [question.documentId]: realtimeData,
          }));
        }
      });
    });
    return () => {
      console.log("[DEBUG] Đang dừng tất cả các máy lắng nghe...");
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [questions]);
  // click vào 1 câu hỏi thì set noti thành đã đọc và chuyển hướng đến trang chi tiết
  const handleQuestionClick = (item) => {
    markNotificationAsRead(item?.documentId);
    navigate(`/questions/${item?.documentId}`);
  };
  const getQuestionData = (item) => {
    if (item.attributes) {
      return {
        id: item.id,
        ...item.attributes,
      };
    }
    return item;
  };
  // console.log(getQuestionData);
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
          ) : (
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
                renderItem={(item) => {
                  const questionData = getQuestionData(item);
                  console.log("quesdata: ", questionData);
                  const updates = realtimeUpdates[questionData.documentId];
                  const currentStatus =
                    updates?.status || questionData?.reqStatus;
                  console.log("currentstatus: ", currentStatus);
                  return (
                    <List.Item
                      onClick={() => handleQuestionClick(questionData)}
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
                            <Text strong>{questionData?.name}</Text>
                            <Tag
                              color={
                                currentStatus === "Đã được phản hồi"
                                  ? "green"
                                  : "orange"
                              }
                              style={{ margin: 0 }}
                            >
                              {currentStatus}
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
                              {questionData?.message?.replace(/<[^>]+>/g, "") ||
                                ""}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatDate(questionData?.createdAt)}
                            </Text>
                          </>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </div>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default Questions;
