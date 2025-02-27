"use client";
import React from "react";
import { Col, Image, Nav, Row, Tab } from "react-bootstrap";

export default function NapTienPage() {
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={12}>
            <Nav variant="pills" style={{ justifyContent: "center" }}>
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <Image src="/imgs/Card.png" alt="card" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  <Image src="/imgs/Atm.png" alt="card" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first">First tab content</Tab.Pane>
              <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
