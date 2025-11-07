import AppBar from "../components/AppBar";
import { API_URL } from "../utils/constant";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { Card, Tag, Col, Row, Anchor, Affix } from "antd";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import RelatedArticles from "../components/RelatedArticles";
// import slugify from "../utils/string_to_slug"
function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Giả sử bạn lấy id từ URL, ví dụ: /articles/123
  const { articleId } = useParams();
  const anchorItems = useMemo(() => {
    // 1. Kiểm tra nếu không có nội dung thì trả về mảng rỗng
    if (!article || !article.content) {
      return [];
    }

    // 2. Khởi tạo một DOMParser
    const parser = new DOMParser();
    // 3. Parse chuỗi HTML thành một tài liệu HTML ảo
    const doc = parser.parseFromString(article.content, "text/html");

    // 4. Query tất cả thẻ <h2> có trong tài liệu ảo đó
    const h2Elements = doc.querySelectorAll("h2");

    // 5. Chuyển NodeList (kết quả của querySelectorAll) sang Array
    // và map qua từng H2 để tạo object theo định dạng của Ant Design
    return Array.from(h2Elements).map((h2) => {
      const id = h2.id;
      const title = h2.textContent || ""; // Lấy nội dung text bên trong thẻ

      return {
        key: id,
        href: `#${id}`, // href phải bao gồm dấu '#'
        title: title,
      };
    });
  }, [article]);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/api/articles/${articleId}?populate=*`
        );
        if (response.data && response.data.data) {
          setArticle(response.data.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết chi tiết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Không tìm thấy bài viết.</div>;
  }

  const updatedAtDate = new Date(article?.updatedAt);
  const timeAgo = formatDistanceToNow(updatedAtDate, {
    addSuffix: true,
    locale: vi,
  });
  const imgFormat = article.image?.formats?.large;
  const imgUrl = imgFormat?.url
    ? `${API_URL}${imgFormat.url}`
    : "/placeholder.jpg";
  const options = {
    replace: (domNode) => {
      // Kiểm tra nếu node là thẻ <img>
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return (
          <img
            style={{
              width: "100%",
            }}
            src={src}
            alt={alt}
          />
        );
      }
    },
  };

  return (
    <>
      <AppBar></AppBar>
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          marginTop: "100px",
          // padding: "40px",
          background: "white",
          borderRadius: "16px",
        }}
      >
        <Card
          style={{
            border: "none",
          }}
        >
          <Row
            justify="flex-start"
            gutter={[
              { xs: 16, sm: 24, md: 32 },
              { xs: 16, sm: 24, md: 32 },
            ]}
          >
            <Col xs={24} sm={24} md={17} key={article.id}>
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
              </div>
              <h1
                style={{
                  fontSize: "40px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  color: "#232D3A",
                }}
              >
                {article?.seo?.metaTitle}
              </h1>
              <div
                style={{
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: "gray",
                  marginBottom: "64px",
                }}
              >
                {timeAgo}
              </div>
              <div>{parse(article?.content || "", options)}</div>
            </Col>
            {/* <Col xs={24} sm={24} md={7} key={article.id}>
              <Affix offsetTop={50}>
                <Card
                  className="toc-card" // Dùng className từ ví dụ trước
                  style={{
                    marginTop: "50px",
                    maxWidth: 350,
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Nội dung
                  </p>
                  <Anchor
                    affix={false}
                    items={anchorItems}
                    style={{
                      background: "transparent",
                    }}
                    targetOffset={110}
                  />
                </Card>
              </Affix>
            </Col> */}
            <Col xs={24} sm={24} md={7} style={{}}>
              <div>
                <img
                  width="300px"
                  height="225px"
                  src={imgUrl}
                  alt="ArticleImage"
                  style={{
                    borderRadius: "16px",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
              </div>
              <Card
                className="toc-card"
                style={{
                  marginTop: "50px",
                  maxWidth: 350,
                  width: "100%",
                  position: "sticky",
                  top: "100px",
                  alignSelf: "flex-start",
                }}
              >
                <p style={{ fontSize: "18px", fontWeight: "500" }}>Nội dung</p>
                <Anchor
                  affix={false}
                  items={anchorItems}
                  style={{ background: "transparent" }}
                  targetOffset={110} // Giữ nguyên targetOffset cho header
                />
              </Card>
              {/* BỎ </Affix> TỪ ĐÂY */}
            </Col>
          </Row>
        </Card>
      </div>
      <RelatedArticles></RelatedArticles>
    </>
  );
}

export default ArticleDetail;
