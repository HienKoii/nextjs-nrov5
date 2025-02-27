"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Import useRouter

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} className="p-2">
      <FloatingLabel controlId="floatingInput" label="Tài khoản" className="mb-3">
        <Form.Control type="text" placeholder="Tài khoản" autoComplete="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Mật khẩu">
        <Form.Control type="password" placeholder="Mật khẩu" autoComplete="current-password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FloatingLabel>

      <div className="d-flex justify-content-center align-items-center">
        <Button variant="success" type="submit" className="mt-3">
          Đăng nhập
        </Button>
      </div>

      <Button as={Link} href={"/forgot-password"} variant="link" className="w-100">
        Quên mật khẩu ?
      </Button>

      <div className="hk-flex gap-1 mt-2">
        <span>Bạn chưa có tài khoản? </span>
        <Button variant="link" as={Link} href={"/register"} className="p-0">
          Đăng ký ngay !
        </Button>
      </div>
    </Form>
  );
}
