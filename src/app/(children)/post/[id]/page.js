"use client";
import Title from "@/components/Title/Title";
import { useParams } from "next/navigation";
import { Col, Image, Row } from "react-bootstrap";

export default function PostPage() {
  const { id } = useParams();
  return (
    <div>
      <Title title={`Giới thiệu ${id}`} color={"warning"} />
      <Row>
        <Col xs={2} md={1}>
          <div className="text-center">
            <Image src="/imgs/avt.gif" alt="post" style={{ width: "100%" }} />
          </div>
          <p className="text-center text-warning" style={{ fontSize: "12px" }}>
            Admin
          </p>
        </Col>

        <Col xs={10} md={11}>
          <div className="post-item" style={{ minHeight: "200px" }}>
            content
          </div>
        </Col>
      </Row>
    </div>
  );
}
