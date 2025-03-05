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

  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" className="text-warning">
                  Tab 1
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="text-warning">
                  Tab 2
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <TabOne />
              </Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
