"use client";
import Title from "@/components/Title/Title";
import useConfig from "@/hooks/useConfig";
import { Col, Image, Row } from "react-bootstrap";

export default function DownloadPage() {
  const { config } = useConfig();

  const getName = (type) => {
    switch (type) {
      case 0:
        return "ios";
      case 1:
        return "ANDROID";
      case 2:
        return "Windows";
      case 3:
        return "JAVA";
      default:
        return "";
    }
  };
  return (
    <>
      <Title title={"Tải game"} />
      <Row className="p-2">
        {config?.download.map((item, index) => {
          return (
            <Col key={index} xs={12} sm={6} lg={6} className="mb-3">
              <div className="post-item">
                <div className="hk-flex gap-2">
                  <Image src={`/imgs/dow${item.type}.png`} alt="down" width={52} />
                  <span className="text-warning fw-bold text-uppercase">{getName(item.type)}</span>
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <hr />
                <div>
                  <a href={item.link} download className="btn btn-success w-100">
                    Tải xuống
                  </a>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
