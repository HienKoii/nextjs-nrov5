"use client";

import TabOne from "@/components/Admin/TabOne";
import TextDivider from "@/components/Divider/TextDivider";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Card, Col, ListGroup, Nav, ProgressBar, Row, Tab } from "react-bootstrap";

export default function AdminPage() {
  const { user } = useUser();
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token || (token && !user?.is_admin)) {
      router.push("/");
    }
  }, [token, user, router]);

  const stats = [
    { title: "Tổng Account", value: 5000, color: "primary", link: "account" },
    { title: "Tổng Player", value: 3000, color: "success", link: "player" },
    { title: "Doanh thu", value: "1,000,000 đ", color: "warning", link: "revenue" },
  ];

  const listNavItem = [
    {
      key: 0,
      title: "Thống kê",
      tabContent: (
        <Row>
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} md={3} key={index}>
              <Card className={`border-${stat.color} border-2 shadow-sm h-100 d-flex flex-column bg-${stat.color}`}>
                <Card.Body className="text-center flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <p className="text-white">{stat.title}</p>
                    <TextDivider text={stat.value} color={"black"} />
                  </div>
                  <Link href={`/admin/${stat.link}`} passHref>
                    <Button variant={"success"} className="mt-auto">
                      Xem chi tiết
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ),
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
