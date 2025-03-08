"use client";

import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { formatCurrency } from "@/lib/utils";

export default function DashboardAdmin() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          // Chuyển đổi dữ liệu API thành danh sách phù hợp
          const formattedStats = [
            { title: "Tổng Account", value: response.data.data.total_accounts, color: "primary", link: "account" },
            { title: "Tổng Player", value: response.data.data.total_players, color: "success", link: "player" },
            { title: "Doanh thu", value: `${formatCurrency(response.data.data.total_revenue)}`, color: "warning", link: "revenue" },
          ];
          setStats(formattedStats);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Đang tải...</span>
        </div>
      ) : (
        <Row>
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} md={6} lg={6} key={index} className="mt-2">
              <div>
                <div className="text-center flex-grow-1 d-flex flex-column justify-content-between post-item">
                  <Card.Header>
                    <p className="text-primary fw-bold">{stat.title}</p>
                  </Card.Header>

                  <h1 className="my-3 text-danger">{stat.value}</h1>

                  <Link href={`/admin/${stat.link}`} passHref>
                    <button className="btn btn-success mt-auto">Xem chi tiết</button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
