import React, { useState, useEffect } from "react";
import LargeArticleCard from "./LargeArticleCard";
import { Col, Row, Pagination } from "antd";
import axios from "axios";
import { API_URL } from "../utils/constant";
const PAGE_SIZE = 3;
const FeaturedArticles = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const params = {
          "filters[isFeatured]": true,
          populate: "*",
          sort: "createdAt:desc",
          "pagination[page]": currentPage,
          "pagination[pageSize]": PAGE_SIZE,
        };
        const response = await axios.get(`${API_URL}/api/articles`, { params });
        if (response.data && response.data.data) {
          setFeaturedArticles(response.data.data);
          setTotalArticles(response.data.meta.pagination.total);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };

    fetchFeaturedArticles();
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div
        className="page-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginTop: "16px",
          padding: "24px",
          background: "transparent",
          borderRadius: "16px",
        }}
      >
        <h2
          style={{
            color: "#232D3A",
            fontSize: "40px",
            fontFamily: "Inter, sans-serif",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Bài viết nổi bật
        </h2>
        <Row
          justify="flex-start"
          gutter={[
            { xs: 16, sm: 24, md: 32 },
            { xs: 16, sm: 24, md: 32 },
          ]}
        >
          {featuredArticles.map((article) => (
            <Col xs={24} sm={12} md={8} key={article.id}>
              <LargeArticleCard article={article} />
            </Col>
          ))}
        </Row>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Pagination
            align="center"
            defaultCurrent={currentPage}
            total={totalArticles}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default FeaturedArticles;
