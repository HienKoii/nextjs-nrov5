"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "", // Thêm trường email vào trạng thái
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form className="p-2">
        <FloatingLabel controlId="floatingUsername" label="Tài khoản" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Tài khoản" //
            name="username"
            value={formValues.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email" //
            name="email"
            value={formValues.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <Form.Text className="text-warning fw-bold">*Vui lòng nhập địa chỉ email để lấy lại tài khoản </Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Mật khẩu" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password" //
            name="password"
            value={formValues.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingConfirmPassword" label="Nhập lại mật khẩu" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password" //
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </FloatingLabel>

        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="success"
            type="submit"
            className="mt-3 text-center" //
            onClick={handleRegister}
            disabled={loading}
          >
            {loading && <Spinner animation="border" variant="light" size="sm" />} Đăng ký
          </Button>
        </div>

        <Button as={Link} href={"/forgot-password"} variant="link" className="w-100">
          Quên mật khẩu ?
        </Button>

        <div className="hk-flex gap-1 mt-2">
          <span>Bạn chưa có tài khoản? </span>
          <Button variant="link" as={Link} href={"/login"} className="p-0">
            Đăng nhập ngay!
          </Button>
        </div>
      </Form>
    </>
  );
}
