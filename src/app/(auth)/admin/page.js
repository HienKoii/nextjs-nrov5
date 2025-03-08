"use client";

import DashboardAdmin from "@/components/Admin/Dashboard";
import TabOne from "@/components/Admin/TabOne";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";

export default function AdminPage() {
  const { user } = useUser();
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token || (token && !user?.is_admin)) {
      router.push("/");
    }
  }, [token, user, router]);

  const listNavItem = [
    {
      key: 0,
      title: "Thống kê",
      tabContent: <DashboardAdmin />,
    },
    {
      key: 1,
      title: "Cộng VNĐ",
      tabContent: <TabOne />,
    },
  ];
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey={listNavItem[0].key}>
        <Row>
          {/* Điều chỉnh Nav để xếp ngang trên màn nhỏ */}
          <Col sm={3} className="mb-3 mb-sm-0">
            <Nav variant="pills" className="d-flex flex-row flex-sm-column justify-content-center">
              {listNavItem.map((item, index) => (
                <Nav.Item key={index} className="me-2 me-sm-0">
                  <Nav.Link eventKey={item.key} className="text-warning">
                    {item.title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              {listNavItem.map((item, index) => (
                <Tab.Pane key={index} eventKey={item.key}>
                  {item.tabContent}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
