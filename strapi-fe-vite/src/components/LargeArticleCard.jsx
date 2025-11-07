import React from "react";
import { Card } from "antd";
import { Tag, Flex, Spin } from "antd";
import { Typography } from "antd";
import parse from "html-react-parser";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
const { Paragraph } = Typography;
import { API_URL } from "../utils/constant";
import { Link } from "react-router-dom";
const LargeArticleCard = ({ article }) => {
  if (!article) {
    return (
      <div
        style={{
          height: "100%",
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
  const imgFormat = article.image?.formats?.large || article.image;
  const imgUrl = imgFormat?.url
    ? `${API_URL}${imgFormat.url}`
    : "/placeholder.jpg";

  const updatedAtDate = new Date(article.updatedAt);
  const timeAgo = formatDistanceToNow(updatedAtDate, {
    addSuffix: true,
    locale: vi,
  });
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Link to={`/article/${article.documentId}`}>
        <Card
          hoverable
          styles={{ body: { padding: "16px" } }}
          style={{
            height: "100%",
            borderRadius: "16px",
            background: "white",
            border: "1px solid #eeeeee",
          }}
        >
          <img
            width="100%"
            height="100%"
            src={imgUrl}
            alt="ArticleImage"
            style={{
              borderRadius: "16px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <div>
            {article.categories.map((tag) => (
              <Tag
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  padding: "4px 10px",
                  margin: "16px 8px 16px 0",
                  borderRadius: "8px",
                }}
                bordered={false}
                color={tag.color}
                key={tag.id}
              >
                {tag.name
                  ? tag.name.charAt(0).toUpperCase() + tag.name.slice(1)
                  : ""}
              </Tag>
            ))}
            <h5
              style={{
                fontSize: "20px",
                fontFamily: "Inter, sans-serif",
                marginBottom: "8px",
                color: "#232D3A",
              }}
            >
              {article.seo.metaTitle}
            </h5>
            <Paragraph
              ellipsis={{ rows: 3 }}
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {parse(article.seo?.metaDescription)}
            </Paragraph>
            <div
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                color: "gray",
              }}
            >
              {timeAgo}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default LargeArticleCard;
