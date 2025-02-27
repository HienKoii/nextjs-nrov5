import Link from "next/link";
import React, { useState } from "react";
import { Button, Card, FloatingLabel, Form, Spinner } from "react-bootstrap";

export default function PaymentCard() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "", // mã thẻ
    serial: "",
    telco: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Form>
        {/* Loại thẻ (selector) */}
        <FloatingLabel controlId="telco" label="Loại thẻ" className="mb-3">
          <Form.Select name="telco" value={formData.telco} onChange={handleChange}>
            <option value="">Chọn loại thẻ</option>
            <option value="VIETTEL">Viettel</option>
            <option value="VINAPHONE">Vinaphone</option>
            <option value="MOBIFONE">Mobifone</option>
          </Form.Select>
        </FloatingLabel>

        {/* Mệnh giá (selector) */}
        <FloatingLabel controlId="amount" label="Mệnh giá" className="mb-3">
          <Form.Select name="amount" value={formData.amount} onChange={handleChange}>
            <option value="">Chọn mệnh giá</option>
            <option value="10000">10.000 VND</option>
            <option value="20000">20.000 VND</option>
            <option value="50000">50.000 VND</option>
            <option value="100000">100.000 VND</option>
            <option value="200000">200.000 VND</option>
            <option value="500000">500.000 VND</option>
          </Form.Select>
        </FloatingLabel>

        {/* Mã thẻ */}
        <FloatingLabel controlId="code" label="Mã thẻ" className="mb-3">
          <Form.Control
            type="number" //
            name="code"
            placeholder="Nhập mã thẻ"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Số seri */}
        <FloatingLabel controlId="serial" label="Số Seri" className="mb-3">
          <Form.Control
            type="number" //
            name="serial"
            placeholder="Nhập số seri"
            value={formData.serial}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* Nút nạp thẻ */}
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="success"
            type="submit" //
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
            className="w-100"
          >
            {loading && <Spinner animation="border" variant="light" size="sm" />}Thực hiện
          </Button>
        </div>
      </Form>
      <>
        <div className="hk-flex p-2 mt-2">
          <Link href={"/"} className="text-warning">
            Kiểm tra lịch sử nạp
          </Link>
        </div>
      </>
    </div>
  );
}
