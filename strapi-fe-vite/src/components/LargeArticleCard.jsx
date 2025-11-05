import React from "react";
import { Card } from "antd";
import { Tag, Flex } from "antd";
import { Typography } from "antd";
const { Paragraph } = Typography;
const LargeArticleCard = () => {
  return (
    <div
      style={{
        height: "100%",
      }}
    >
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
          src="/images/SEO_6_1_629e1800b2.png"
          alt="ArticleImage"
          style={{
            borderRadius: "16px",
          }}
        />
        <div>
          <Tag
            style={{
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              padding: "4px 10px",
              margin: "16px 0 16px 0",
              borderRadius: "8px",
            }}
            bordered={false}
            color="red"
          >
            Hiệu suất
          </Tag>
          <h5
            style={{
              fontSize: "20px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "8px",
              color: "#232D3A",
            }}
          >
            Thiết lập KPI theo SMART: Mục tiêu đúng, kết quả đúng Thiết lập
          </h5>
          <Paragraph
            ellipsis={{ rows: 3 }}
            style={{
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <div
            style={{
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              //   marginBottom: "8px",
              color: "gray",
              //   color: "#232D3A",
            }}
          >
            7 tháng trước
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LargeArticleCard;
