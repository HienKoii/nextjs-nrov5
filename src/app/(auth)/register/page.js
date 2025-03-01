"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "", // Thêm trường email vào trạng thái
  });

  // Kiểm tra nếu đã có token thì điều hướng về trang chủ
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, email } = formValues;
    setLoading(true);
    try {
      const payload = {
        username,
        password,
        confirmPassword,
        email, // Gửi email cùng với payload
      };
      const response = await axios.post("/api/auth/register", payload);
      console.log("Xử lý đăng ký?>>", response);
      toast.success(response?.data?.message);
      toast.success("Hãy đăng nhập ngay nào !!");
      setFormValues({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });
      router.push("/login");
    } catch (error) {
      console.error("Lỗi khi xử lý đăng ký ???", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
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

        <Button as={Link} href={"/forgot-password"} variant="link" className="w-100 mt-3">
          Quên mật khẩu ?
        </Button>

        <div className="hk-flex gap-1 mt-2">
          <span className="text-white">Bạn đã có tài khoản? </span>
          <Button variant="link" as={Link} href={"/login"} className="p-0">
            Đăng nhập ngay!
          </Button>
        </div>
      </Form>
    </>
  );
}
