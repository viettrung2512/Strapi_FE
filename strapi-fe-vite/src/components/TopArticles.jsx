import React from "react";
import { Col, Row, Flex, Card, Spin } from "antd";
import LargeArticleCard from "./LargeArticleCard";
import SmallArticleCard from "./SmallArticleCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constant";

const TopArticles = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const mainArticle = featuredArticles[0];
  const sideArticles = featuredArticles.slice(1);
  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      setLoading(true);
      try {
        const params = {
          "filters[isFeatured]": true,
          populate: "*",
          sort: "createdAt:desc",
          "pagination[page]": 1,
          "pagination[pageSize]": "5",
        };
        const response = await axios.get(`${API_URL}/api/articles`, { params });
        if (response.data && response.data.data) {
          setFeaturedArticles(response.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);
  if (loading) {
    return (
      <div
        style={{
          marginTop: "150px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "48px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div
      className="page-container"
      style={{
        maxWidth: "1150px",
        margin: "0 auto",
        marginTop: "100px",
        padding: "40px",
        background: "white",
        borderRadius: "16px",
      }}
    >
      <h1
        style={{
          color: "#232D3A",
          fontSize: "40px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Khai phá sức mạnh tiềm năng
      </h1>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          margin: "18px 0 18px 0",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        Hiểu được sức mạnh của OKR và KPI, áp dụng thành công vào doanh nghiệp
        của bạn là điều tuyệt vời.
      </p>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col xs={24} lg={13} style={{ display: "flex" }}>
          <LargeArticleCard article={mainArticle} />
        </Col>
        <Col xs={24} lg={11} style={{ display: "flex" }}>
          <Flex vertical gap="small" style={{ height: "100%" }}>
            {sideArticles.map((article) => (
              <SmallArticleCard key={article.id} article={article} />
            ))}
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default TopArticles;
