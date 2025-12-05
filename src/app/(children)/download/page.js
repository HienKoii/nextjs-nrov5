"use client";
import Title from "@/components/Title/Title";
import { Col, Image, Row } from "react-bootstrap";

export default function DownloadPage() {
  const downloads = [
    {
      type: 0,
      name: "IOS",
      icon: "/imgs/dow0.png",
      content: "Phiên bản dành cho iPhone. <br/>- File .ipa",
      links: [
        {
          label: "Tải IPA",
          url: process.env.NEXT_PUBLIC_IOS_IPA,
          color: "btn-success",
          download: true,
        },
        {
          label: "TestFlight",
          url: process.env.NEXT_PUBLIC_IOS_TESTFLIGHT,
          color: "btn-primary",
          download: false,
        },
      ],
    },
    {
      type: 1,
      name: "Android",
      icon: "/imgs/dow1.png",
      content: "Phiên bản dành cho Android. <br/>- File .apk",
      links: [
        {
          label: "Tải APK",
          url: process.env.NEXT_PUBLIC_ANDROID_APK,
          color: "btn-success",
          download: true,
        },
      ],
    },
    {
      type: 2,
      name: "Windows",
      icon: "/imgs/dow2.png",
      content: "Phiên bản dành cho Windows (pc). <br/>- File .rar, .zip",
      links: [
        {
          label: "Tải cho Windows",
          url: process.env.NEXT_PUBLIC_WINDOWS_ZIP,
          color: "btn-success",
          download: true,
        },
      ],
    },
    {
      type: 3,
      name: "Java",
      icon: "/imgs/dow3.png",
      content: "Phiên bản dành cho Java.<br/>- File .jar",
      links: [
        {
          label: "Tải JAR",
          url: process.env.NEXT_PUBLIC_JAVA_JAR,
          color: "btn-success",
          download: true,
        },
      ],
    },
  ];

  return (
    <>
      <Title title="Tải game" />
      <Row className="p-2">
        {downloads.map((item, index) => (
          <Col key={index} xs={12} sm={6} lg={6} className="mb-3">
            <div className="post-item">
              <div className="hk-flex gap-2">
                <Image src={item.icon} alt="down" width={52} />
                <span className="text-warning fw-bold text-uppercase">{item.name}</span>
              </div>

              <hr />

              <div dangerouslySetInnerHTML={{ __html: item.content }} />

              <hr />

              {/* Render tất cả nút trong links */}
              {item.links.map((btn, idx) => (
                <a key={idx} href={btn.url} className={`btn w-100 mb-2 ${btn.color}`} {...(btn.download ? { download: true } : {})} target={btn.download ? "" : "_blank"} rel="noreferrer">
                  {btn.label}
                </a>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
