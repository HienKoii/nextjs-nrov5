"use client";
import Information from "@/components/profile/Information";
import TransactionHistory from "@/components/profile/TransactionHistory";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const tabs = [
  {
    key: 0,
    label: "Thông tin",
    content: <Information />,
  },
  {
    key: 1,
    label: "Lịch sử GD", //
    content: <TransactionHistory />,
  },
];
export default function ProfilePage() {
  const router = useRouter();
  const { handleLogout } = useUser();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      router.push("/"); // Chuyển hướng về trang đăng nhập
    }
  }, [token]);

  return (
    <div>
      <Row className="mb-3">
        <Col className="hk-flex">
          {tabs.map((tab) => (
            <Button
              key={tab.key} //
              variant={activeTab === tab.key ? "success active" : "success "}
              onClick={() => setActiveTab(tab.key)}
              className="me-2"
            >
              {tab.label}
            </Button>
          ))}
        </Col>
      </Row>

      <div className="p-3">{tabs.find((tab) => tab.key === activeTab)?.content}</div>
      <div className="text-center">
        <Button variant="success" onClick={() => handleLogout()}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
