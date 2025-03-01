"use client";
import Title from "@/components/Title/Title";
import Link from "next/link";
import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";

export default function DownloadPage() {
  return (
    <>
      <Title title={"Tải game"} />
      <Row className="p-2">
        <Col xs={12} sm={6} lg={6} className="mb-3">
          <div className="post-item">
            <div className="hk-flex gap-2">
              <Image src="/imgs/dow2.png" alt="down" width={52} />
              <span className="text-warning fw-bold">IOS</span>
            </div>
            <hr />
            <div>
              - Phiên bản dành cho iphone.
              <br />- File .ipa
            </div>
            <hr />
            <div>
              <Button variant="success" className="w-100">
                Tải xuống
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} lg={6} className="mb-3">
          <div className="post-item">
            <div className="hk-flex gap-2">
              <Image src="/imgs/dow1.png" alt="down" width={52} />
              <span className="text-warning fw-bold">ANDROID</span>
            </div>
            <hr />
            <div>
              - Phiên bản dành cho Android.
              <br />- File .apk
            </div>
            <hr />
            <div>
              <Button variant="success" className="w-100">
                Tải xuống
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} lg={6} className="mb-3">
          <div className="post-item">
            <div className="hk-flex gap-2">
              <Image src="/imgs/dow4.png" alt="down" width={52} />
              <span className="text-warning fw-bold">Windows</span>
            </div>
            <hr />
            <div>
              - Phiên bản dành cho Windows(pc).
              <br />- File .rar, .zip
            </div>
            <hr />
            <div>
              <Button variant="success" className="w-100">
                Tải xuống
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6} lg={6} className="mb-3">
          <div className="post-item">
            <div className="hk-flex gap-2">
              <Image src="/imgs/dow3.png" alt="down" width={52} />
              <span className="text-warning fw-bold">JAVA</span>
            </div>
            <hr />
            <div>
              - Phiên bản dành cho JAVA.
              <br />- File .jar
            </div>
            <hr />
            <div>
              <Button variant="success" className="w-100">
                Tải xuống
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
