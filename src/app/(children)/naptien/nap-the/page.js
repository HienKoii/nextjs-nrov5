"use client";
import PageError from "@/components/404/PageError";
import PageNoSession from "@/components/404/PageNoSession";
import { useConfig } from "@/context/ConfigContext";
import { PATH_NAME } from "@/lib/path";
import { formatStatusCard } from "@/utils/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button, Card, FloatingLabel, Form, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

export default function NapThePage() {
  const { data: session } = useSession();
  const { config } = useConfig();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "", // mã thẻ
    serial: "",
    telco: "",
    amount: "",
  });

  if (!session) {
    return <PageNoSession />;
  }

  if (config?.function?.NapThe?.isBaoTri) {
    return <PageError text={config?.function?.NapThe?.TextBaoTri} />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("formData", formData);
      // thêm token để biết user nào nạp tiền
      const response = await axios.post("/api/napthe/payload", formData);
      Swal.fire({
        title: "Thông báo",
        text: formatStatusCard(response?.data?.status),
        icon: response?.data?.status === 1 || response?.data?.status === 2 ? "success" : "error",
      });
      setFormData({
        code: "", // mã thẻ
        serial: "",
        telco: "",
        amount: "",
      });
      console.log("Xử lý nạp thẻ ?>>> ", response);
    } catch (error) {
      Swal.fire({
        title: "Thông báo",
        text: error?.response?.data?.message,
        icon: "error",
      });
      console.log("error postThe", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form className="p-3">
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
          <Button variant="primary" type="submit" disabled={loading} onClick={(e) => handleSubmit(e)}>
            {loading && <Spinner animation="border" variant="light" size="sm" />} Nạp thẻ
          </Button>
        </div>
      </Form>
      <Card>
        <div className="hk-flex p-2">
          <span>👉</span>
          <Link href={PATH_NAME.napTien.lichSu} className="text-danger fw-bold">
            Kiểm tra lịch sử nạp
          </Link>
          <span>👈</span>
        </div>
      </Card>
    </>
  );
}
