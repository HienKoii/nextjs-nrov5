"use client";
import PaymentAtm from "@/components/Payment/Atm";
import PaymentCard from "@/components/Payment/Card";
import Title from "@/components/profile/Title/Title";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Col, Image, Nav, Row, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      toast.error("Vui lòng đăng nhập");
      router.push("/");
    }
  }, [token]);
  return (
    <div>
      <Title title={"Nạp tiền"} />
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={12} className="mb-3">
            <Nav variant="pills" as={Row}>
              <Nav.Item className="hk" as={Col} xs={6}>
                <Nav.Link eventKey="first" className="hk text-center">
                  <Image src="/imgs/Card.png" alt="card" style={{ width: "100px" }} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="hk" as={Col} xs={6}>
                <Nav.Link eventKey="second" className="hk text-center">
                  <Image src="/imgs/Atm.png" alt="Atm" style={{ width: "100px" }} />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <PaymentCard />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <PaymentAtm />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
