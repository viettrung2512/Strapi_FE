import SmallArticleCard from "./SmallArticleCard";
import { Col, Row } from "antd";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constant";

const PAGE_SIZE = 4;
const NewArticles = () => {
  const [newArticles, setNewArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  useEffect(() => {
    const fetchNewArticles = async () => {
      try {
        const params = {
          populate: "*",
          sort: "createdAt:desc",
          "pagination[page]": currentPage,
          "pagination[pageSize]": PAGE_SIZE,
        };
        const response = await axios.get(`${API_URL}/api/articles`, { params });
        if (response.data && response.data.data) {
          setNewArticles(response.data.data);
          setTotalArticles(response.data.meta.pagination.total);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };

    fetchNewArticles();
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
          marginBottom: "64px",
          padding: "24px",
          background: "transparents",
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
          }}
        >
          Bài viết mới
        </h2>
        <Row
          justify="flex-start"
          gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          {newArticles.map((article) => (
            <Col xs={24} md={12} key={article.id}>
              <SmallArticleCard article={article}></SmallArticleCard>
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
export default NewArticles;
