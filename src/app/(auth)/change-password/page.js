"use client";
import Title from "@/components/Title/Title";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.post("/api/auth/change-password", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response", response);
        toast.success(response?.data?.message);
        if (response.status === 200) {
          router.push("/profile");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title title={"Đổi mật khẩu"} />
      <Form>
        {/* Trường username ẩn để đảm bảo tính khả dụng */}
        <Form.Control type="text" name="username" style={{ display: "none" }} autoComplete="username" aria-label="Username" />

        <FloatingLabel controlId="currentPassword" label="Mật khẩu hiện tại" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Mật khẩu hiện tại"
            autoComplete="current-password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            aria-label="Current Password"
          />
        </FloatingLabel>

        <FloatingLabel controlId="newPassword" label="Mật khẩu mới" className="mb-3">
          <Form.Control
            type="password" //
            placeholder="Mật khẩu mới"
            autoComplete="new-password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            aria-label="New Password"
          />
        </FloatingLabel>

        <FloatingLabel controlId="confirmNewPassword" label="Xác nhận mật khẩu mới" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            autoComplete="new-password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
            aria-label="Confirm New Password"
          />
        </FloatingLabel>

        <div className="d-flex justify-content-center align-items-center">
          <Button variant="success" type="submit" onClick={handleSubmit} disabled={loading}>
            {loading && <Spinner animation="border" variant="light" size="sm" />} Đổi mật khẩu
          </Button>
        </div>
      </Form>
    </>
  );
}
