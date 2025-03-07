"use client";

import TabOne from "@/components/Admin/TabOne";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Col, Form, Nav, Row, Spinner, Tab } from "react-bootstrap";

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
      title: "Cộng VNĐ",
      tabContent: <TabOne />,
    },
    {
      key: 1,
      title: "tow",
      tabContent: <p>Nội dung key 2</p>,
    },
  ];
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey={listNavItem[0].key}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {listNavItem.map((item, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={item.key} className="text-warning">
                      {item.title}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {listNavItem.map((item, index) => {
                return (
                  <Tab.Pane key={index} eventKey={item.key}>
                    {item.tabContent}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
