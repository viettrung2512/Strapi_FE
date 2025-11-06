import React from "react";
import { Card } from "antd";
import { Tag, Flex } from "antd";

const SmallArticleCard = () => {
  return (
    <div>
      <Card
        hoverable
        styles={{ body: { padding: "16px", height: "100%" } }}
        style={{
          borderRadius: "16px",
          background: "white",
          height: "163px",
          minWidth: "480px",
          width: "100%",
        }}
        // bodyStyle={{ height: "100%" }}
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
              src="/images/SEO_6_1_629e1800b2.png"
              alt="ArticleImage"
              style={{
                borderRadius: "16px",
              }}
            />
          </div>
          <div>
            <Tag
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                padding: "4px 10px",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
              bordered={false}
              color="red"
            >
              Hiệu suất
            </Tag>
            <Tag
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                padding: "4px 10px",
                marginBottom: "8px",
                borderRadius: "8px",
              }}
              bordered={false}
              color="red"
            >
              Hiệu suất
            </Tag>
            <Tag
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                padding: "4px 10px",
                marginBottom: "8px",
                borderRadius: "8px",
              }}
              bordered={false}
              color="red"
            >
              Hiệu suất
            </Tag>
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
              Thiết lập KPI theo SMART: Mục tiêu đúng, kết quả đúng
            </h4>

            <div
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                // marginBottom: "8px",
                color: "gray",
                Color: "#232D3A",
              }}
            >
              7 tháng trước
            </div>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export default SmallArticleCard;
