import React from "react";
import { Card } from "antd";
import { Tag, Flex, Spin } from "antd";
// import parse from "html-react-parser";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { API_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const SmallArticleCard = ({ article }) => {
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
    <div>
      <Link to={`/article/${article.documentId}`}>
        <Card
          hoverable
          styles={{ body: { padding: "16px", height: "100%" } }}
          style={{
            borderRadius: "16px",
            background: "white",
            height: "160px",
            minWidth: "480px",
            width: "100%",
          }}
        >
          <Flex
            gap="small"
            align="center"
            justify="center"
            style={{ height: "100%" }}
          >
            <div>
              <img
                width={140}
                height={103}
                src={imgUrl}
                alt="ArticleImage"
                style={{
                  borderRadius: "16px",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </div>
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
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: "8px",
                  Color: "#232D3A",
                }}
              >
                {article.title}
              </h4>

              <div
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: "gray",
                  Color: "#232D3A",
                }}
              >
                {timeAgo}
              </div>
            </div>
          </Flex>
        </Card>
      </Link>
    </div>
  );
};

export default SmallArticleCard;
