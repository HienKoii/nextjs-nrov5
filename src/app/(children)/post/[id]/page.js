"use client";
import Title from "@/components/Title/Title";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { formatTextHtml, formatTime } from "@/lib/utils";
import useConfig from "@/hooks/useConfig";

export default function PostIdPage() {
  const { id } = useParams();
  const { config } = useConfig();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⛔ config chưa sẵn sàng → vẫn loading
    if (!config?.dataPosts) return;

    const response = config.dataPosts.find((p) => p.id == id);
    console.log("Lấy bài viết theo ID:", response);

    setPost(response || null);
    setLoading(false);
  }, [id, config]);

  return (
    <div>
      <Title title="Chi tiết bài viết" />

      {loading ? (
        <p className="text-center text-warning">Đang tải bài viết...</p>
      ) : post ? (
        <Row>
          <Col xs={2} md={1} className="p-0 pe-2">
            <div className="text-center">
              <Image src="/imgs/avt.gif" alt="post" style={{ width: "100%" }} />
            </div>
            <p className="text-center text-warning" style={{ fontSize: "12px" }}>
              {post.username}
            </p>
          </Col>

          <Col xs={10} md={11} className="p-0">
            <div className="post-item p-1">
              <div className="text-primary text-uppercase d-inline">
                <span style={{ fontSize: "12px" }} className="fw-semibold me-1">
                  {post.tieude}
                </span>
                {post.hot && <Image src="/imgs/hot.gif" width={24} alt="hot" />}
                {post.new && <Image src="/imgs/new.gif" width={24} alt="new" />}
              </div>

              <hr className="mt-2" />

              <div
                className="mt-1 post-content"
                dangerouslySetInnerHTML={{
                  __html: formatTextHtml(post.noidung),
                }}
              />

              {post.image &&
                JSON.parse(post.image).map((item, index) => (
                  <div key={index} className="hk-flex mt-1">
                    <Image src={item} className="w-100" style={{ borderRadius: "12px" }} />
                  </div>
                ))}

              <hr className="mt-0 mb-1" />
              <p className="text-primary fst-italic" style={{ fontSize: "12px" }}>
                {formatTime(post.created_at)}
              </p>
            </div>
          </Col>
        </Row>
      ) : (
        <p className="text-center text-danger">Không tìm thấy bài viết</p>
      )}
    </div>
  );
}
