"use client";
import Title from "@/components/Title/Title";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { formatTime } from "@/lib/utils";

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        console.log("Lấy bài viết theo ID: ", response.data);
        setPost(response.data); // Giả sử API trả về object { id, title, content }
      } catch (error) {
        console.error("Lỗi lấy bài viết theo ID", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      <Title title={post?.tieude ? post?.tieude : "Bài viết"} color={"warning"} />

      {loading ? (
        <p className="text-center text-warning">Đang tải bài viết...</p>
      ) : post ? (
        <Row>
          <Col xs={2} md={1}>
            <div className="text-center">
              <Image src="/imgs/avt.gif" alt="post" style={{ width: "100%" }} />
            </div>
            <p className="text-center text-warning" style={{ fontSize: "12px" }}>
              {post?.username}
            </p>
          </Col>

          <Col xs={10} md={11}>
            <div className="post-item">
              <h4 className="text-warning">{post?.tieude}</h4>
              <hr />
              <p className="text-black" style={{ minHeight: "200px" }}>
                {post.noidung}
              </p>
              <hr className="mt-0 mb-1" />
              <p className="text-primary fst-italic" style={{ fontSize: "12px" }}>
                {formatTime(post?.created_at)}
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
