import React, { useState, useEffect } from "react";
import LargeArticleCard from "./LargeArticleCard";
import { Col, Row, Pagination } from "antd";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
const PAGE_SIZE = 3;
const RelatedArticles = () => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const { articleId } = useParams();
  //   const fetchCurrentArticle = async () => {
  //     try {
  //       const params = {
  //         //   "filters[isFeatured]": true,
  //         populate: "*",
  //         //   sort: "createdAt:desc",
  //         //   "pagination[page]": currentPage,
  //         //   "pagination[pageSize]": PAGE_SIZE,
  //       };
  //       const currentArticle = await axios.get(
  //         `${API_URL}/api/articles/${articleId}`,
  //         { params }
  //       );
  //       if (currentArticle.data && currentArticle.data.data) {
  //         const params = {
  //           "filters[documentId][$ne]": articleId,
  //           // "filters[categories][documentId][$in][0]":
  //           //   currentArticle?.categories?.documentId[0],
  //           // "filters[categories][documentId][$in][1]":
  //           //   currentArticle?.categories?.documentId[1],
  //           "pagination[pageSize]": PAGE_SIZE,
  //           populate: "*",
  //         };
  //         const categories = currentArticle.data.data.categories;

  //         // 3. Kiểm tra xem categories có phải là mảng và có phần tử không
  //         if (Array.isArray(categories) && categories.length > 0) {
  //           // 4. DÙNG .MAP() ĐỂ LẤY TẤT CẢ CÁC documentId
  //           const categoryIds = categories.map((cat) => cat.documentId);

  //           // 5. GÁN CẢ MẢNG categoryIds VÀO KEY [$in]
  //           // (Bỏ [0], [1] đi)
  //           params["filters[categories][documentId][$in]"] = categoryIds;
  //         }
  //         const response = await axios.get(`${API_URL}/api/articles`, {
  //           params,
  //         });
  //         if (response.data && response.data.data) {
  //           setRelatedArticles(response.data.data);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Lỗi khi tải bài viết:", err);
  //     }
  //   };

  //   fetchCurrentArticle();
  // }, [articleId]);
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const currentArticleResponse = await axios.get(
          `${API_URL}/api/articles/${articleId}`,
          { params: { populate: "*" } }
        );

        if (currentArticleResponse.data && currentArticleResponse.data.data) {
          const currentArticleData = currentArticleResponse.data.data;

          const categories = currentArticleData.categories;

          const params = {
            "filters[documentId][$ne]": articleId,
            "pagination[pageSize]": PAGE_SIZE,
            populate: "*",
          };

          if (Array.isArray(categories) && categories.length > 0) {
            const categoryIds = categories.map((cat) => cat.documentId);

            params["filters[categories][documentId][$in]"] = categoryIds;
          }

          const relatedResponse = await axios.get(`${API_URL}/api/articles`, {
            params,
          });

          if (relatedResponse.data && relatedResponse.data.data) {
            setRelatedArticles(relatedResponse.data.data);
          }
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết liên quan:", err);
      }
    };

    fetchRelatedArticles();
  }, [articleId]);
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
          Bài viết liên quan
        </h2>
        <Row
          justify="flex-start"
          gutter={[
            { xs: 16, sm: 24, md: 32 },
            { xs: 16, sm: 24, md: 32 },
          ]}
        >
          {relatedArticles.map((article) => (
            <Col xs={24} sm={12} md={8} key={article.id}>
              <LargeArticleCard article={article} />
            </Col>
          ))}
        </Row>
        <div
          style={{
            marginTop: "20px",
          }}
        ></div>
      </div>
    </>
  );
};

export default RelatedArticles;
