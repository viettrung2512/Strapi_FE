import React, { useState, useEffect } from "react";
import { Layout, Tag, Typography, Spin, message, Button, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom"; //
import axios from "axios";
import { API_URL } from "../utils/constant";
import AppBar from "../components/AppBar";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import ContactModal from "../components/ContactModal";
import FloatingButton from "../components/FloatingButton";

const { Content } = Layout;
const { Text } = Typography;

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleString("vi-VN", { hour12: false });

const QuestionDetail = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  // const location = useLocation(); // THÊM location

  // State lấy dữ liệu từ strapi - NHẬN TỪ LOCATION STATE ĐẦU TIÊN
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(!location.state?.question); // Chỉ loading nếu không có data từ state

  // State lấy dữ liệu từ firestore
  const [realtimeData, setRealtimeData] = useState(null);
  const [contactModalVisible, setContactModalVisible] = useState(false);

  const handleOpenContactModal = () => {
    setContactModalVisible(true);
  };

  const handleCloseContactModal = () => {
    setContactModalVisible(false);
  };


  useEffect(() => {
    if (!questionId) return;

    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("Bạn chưa đăng nhập.");
          return;
        }

        const res = await axios.get(
          `${API_URL}/api/questions/${questionId}?populate=*`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestion(res.data.data);
      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu:", err);
        message.error("Không thể tải chi tiết câu hỏi");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  },[questionId]);

  // xử lý realtime
  useEffect(() => {
    if (!questionId) return;

    const questionDocRef = doc(db, "questions", String(questionId));
    console.log(`[DEBUG] Bắt đầu lắng nghe real-time cho QID: ${questionId}`);

    const unsubscribe = onSnapshot(questionDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("[DEBUG] Real-time update:", data);
        setRealtimeData(data);
      } else {
        console.log(
          "Không tìm thấy document trên Firestore (có thể admin chưa trả lời)"
        );
      }
    });

    return () => {
      console.log(`[DEBUG] Dừng lắng nghe QID: ${questionId}`);
      unsubscribe();
    };
  }, [questionId]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin />
      </div>
    );
  }

  if (!question) {
    return (
      <>
        <AppBar />
        <Layout style={{ marginTop: 60, minHeight: "calc(100vh - 60px)" }}>
          <Content style={{ padding: "50px", textAlign: "center" }}>
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/questions")}
              style={{ marginBottom: 20 }}
            >
              Quay lại danh sách
            </Button>
            <div>Không tìm thấy câu hỏi.</div>
          </Content>
        </Layout>
      </>
    );
  }

  // Trộn dữ liệu: Ưu tiên real-time, nếu không có thì dùng dữ liệu gốc
  const currentStatus =
    realtimeData?.status || question.reqStatus || "Đang xử lý";
  const currentAnswerHtml = realtimeData?.answer;
  const originalAnswer = question.answer;

  return (
    <>
      <AppBar />
      <Layout
        style={{
          marginTop: 60,
          minHeight: "calc(100vh - 60px)",
          backgroundColor: "#f4f6f8",
        }}
      >
        <Content
          style={{
            background: "#fff",
            padding: "30px 50px",
          }}
        >
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/questions")}
            style={{ marginBottom: 20 }}
          >
            Quay lại danh sách
          </Button>

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
                  {question.name}
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {question.email}
                </Text>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {formatDate(question.createdAt)}
                </Text>
                <br />
                <Tag
                  color={
                    currentStatus === "Đã phản hồi" ||
                    currentStatus === "Đã được phản hồi"
                      ? "green"
                      : "orange"
                  }
                  style={{ marginTop: 4 }}
                >
                  {currentStatus}
                </Tag>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: question.message }}
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                marginTop: 12,
                whiteSpace: "pre-wrap",
              }}
            />
          </Card>

          {/* phản hồi của admin */}
          {(currentAnswerHtml || originalAnswer) && (
            <>
              <span
                style={{
                  fontSize: "24px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "600",
                }}
              >
                Phản hồi của Admin
              </span>
              <Card
                style={{
                  marginTop: "16px",
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
                      {currentAnswerHtml
                        ? formatDate(new Date())
                        : formatDate(originalAnswer?.createdAt)}
                    </Text>
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: currentAnswerHtml || originalAnswer?.message,
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
        </Content>
      </Layout>

      <FloatingButton
        onClick={handleOpenContactModal}
        tooltip="Gửi câu hỏi mới"
      />

      <ContactModal
        visible={contactModalVisible}
        onClose={handleCloseContactModal}
      />
    </>
  );
};

export default QuestionDetail;
