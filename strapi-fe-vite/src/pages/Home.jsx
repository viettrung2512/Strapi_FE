import AppBar from "../components/AppBar";
import SmallArticleCard from "../components/SmallArticleCard";
import LargeArticleCard from "../components/LargeArticleCard";
import { Col, Row } from "antd";
import { Flex } from "antd";
import { Pagination } from "antd";
function Home() {
  return (
    <main
      style={{
        background: "#f0f8ff",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <AppBar></AppBar>
      <div
        className="page-container"
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          marginTop: "16px",
          marginBottom: "64px",
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

            // fontWeight: "700",
          }}
        >
          Hiểu được sức mạnh của OKR và KPI, áp dụng thành công vào doanh nghiệp
          của bạn là điều tuyệt vời.
        </p>
        {/* <Flex gap="small" align="center">
          <div
            style={{
              flexBasis: "50%",
            }}
          >
            <LargeArticleCard></LargeArticleCard>
          </div>
          <Flex vertical gaps="small">
            <div
            //   style={{
            //     flexBasis: "50%",
            //   }}
            >
              <SmallArticleCard></SmallArticleCard>
              <SmallArticleCard></SmallArticleCard>
              <SmallArticleCard></SmallArticleCard>
            </div>
          </Flex>
        </Flex> */}
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          {/* CỘT TRÁI (60%) */}
          <Col xs={24} lg={13} style={{ display: "flex" }}>
            <LargeArticleCard />
          </Col>

          {/* CỘT PHẢI (40%) */}
          <Col xs={24} lg={11} style={{ display: "flex" }}>
            {/* Dùng Flex vertical để xếp danh sách thẻ nhỏ */}
            <Flex vertical gap="small" style={{ height: "100%" }}>
              <SmallArticleCard />
              <SmallArticleCard />
              <SmallArticleCard />
              <SmallArticleCard />
            </Flex>
          </Col>
        </Row>
      </div>
      <div
        className="page-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginTop: "16px",
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
          Bài viết nổi bật
        </h2>
        <Row
          justify="flex-start"
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          <Col xs={24} md={8}>
            <LargeArticleCard></LargeArticleCard>
          </Col>
          <Col xs={24} md={8}>
            <LargeArticleCard></LargeArticleCard>
          </Col>
          <Col xs={24} md={8}>
            <LargeArticleCard></LargeArticleCard>
          </Col>
          <Col xs={24} md={8}>
            <LargeArticleCard></LargeArticleCard>
          </Col>
          <Col xs={24} md={8}>
            <LargeArticleCard></LargeArticleCard>
          </Col>
        </Row>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Pagination align="center" defaultCurrent={1} total={50} />
        </div>
      </div>
      <div
        className="page-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginTop: "16px",
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
          gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        >
          <Col xs={24} md={12}>
            <SmallArticleCard></SmallArticleCard>
          </Col>
          <Col xs={24} md={12}>
            <SmallArticleCard></SmallArticleCard>
          </Col>
          <Col xs={24} md={12}>
            <SmallArticleCard></SmallArticleCard>
          </Col>
          <Col xs={24} md={12}>
            <SmallArticleCard></SmallArticleCard>
          </Col>
        </Row>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Pagination align="center" defaultCurrent={1} total={50} />
        </div>
      </div>
    </main>
  );
}

export default Home;
