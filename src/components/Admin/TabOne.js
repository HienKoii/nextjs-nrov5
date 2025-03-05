import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function TabOne() {
  const [identifier, setIdentifier] = useState("");
  const [amount, setAmount] = useState("");
  const [isUsername, setIsUsername] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = { amount, identifier, isUsername };
        const response = await axios.post("/api/admin/vnd", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Xử lý cộng tiền", response);
        setAmount("");
        setIdentifier("");
        Swal.fire({
          title: "Thông báo",
          text: response.data.message,
          icon: "success",
          scrollbarPadding: false,
        });
        console.log("xử lý cộng vnd", response);
      } catch (err) {
        toast.error(err.response?.data?.message || "Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="amount" className="mb-3">
          <Form.Control
            type="number" //
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Nhập số tiền"
          />
        </Form.Group>

        <Form.Group controlId="identifier" className="mb-3">
          <Form.Control
            type="text"
            value={identifier} //
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="Nhập tên đăng nhập hoặc ID"
          />
        </Form.Group>

        <Form.Group className="mb-3 hk-flex gap-2">
          <Form.Check
            type="radio"
            label="Username" //
            name="identifierType"
            checked={isUsername}
            onChange={() => setIsUsername(true)}
          />
          <Form.Check type="radio" label="ID" name="identifierType" checked={!isUsername} onChange={() => setIsUsername(false)} />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100" disabled={loading}>
          {loading && <Spinner animation="border" variant="light" size="sm" />} Cộng tiền
        </Button>
      </Form>
    </>
  );
}
