"use client";
import Title from "@/components/Title/Title";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { formatTextHtml, formatTime } from "@/lib/utils";

export default function PostIdPage() {
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
      <Title title={`Chi tiết bài viết`} />

      {loading ? (
        <p className="text-center text-warning">Đang tải bài viết...</p>
      ) : post ? (
        <Row>
          <Col xs={2} md={1} className="p-0 pe-2">
            <div className="text-center">
              <Image src="/imgs/avt.gif" alt="post" style={{ width: "100%" }} />
            </div>
            <p className="text-center text-warning" style={{ fontSize: "12px" }}>
              {post?.username}
            </p>
          </Col>

          <Col xs={10} md={11} className="p-0">
            <div className="post-item">
              <div className="hk-flex-x gap-2">
                <h4 className="text-primary m-0 fs-5">{post?.tieude}</h4>
                {post?.hot ? <Image src="/imgs/hot.gif" alt="hot" width={28} /> : null}
                {post?.new ? <Image src="/imgs/new.gif" alt="new" width={28} /> : null}
              </div>
              <hr className="mt-2" />
              <div className="mt-1" dangerouslySetInnerHTML={{ __html: formatTextHtml(post?.noidung) }} />
              {post?.image &&
                JSON.parse(post?.image)?.map((item, index) => {
                  return (
                    <div key={index} className="hk-flex mt-1">
                      <Image src={item} alt={`img-${index}`} className="w-100" style={{ borderRadius: "12px" }} />
                    </div>
                  );
                })}
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
