"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import Title from "@/components/Title/Title";

export default function LoginPage() {
  const { setUser } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading khi đăng nhập
  const router = useRouter();

  // Kiểm tra nếu đã có token thì điều hướng về trang chủ
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading

    try {
      const response = await axios.post("/api/auth/login", { username, password });

      // Nếu đăng nhập thành công
      if (response.status === 200) {
        const { token, user } = response.data;
        setUser(user);
        // Lưu token vào localStorage
        localStorage.setItem("token", token);

        // Hiển thị thông báo thành công
        toast.success(`Xin chào, ${user?.username}`);

        // Chuyển hướng đến trang chính
        router.push("/");
      }
    } catch (error) {
      // Kiểm tra lỗi từ server
      if (error.response) {
        toast.error(error.response.data.message || "Đăng nhập thất bại.");
      } else {
        toast.error("Lỗi kết nối đến server.");
      }
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <>
      <Title title={"Đăng nhập"} />
      <Form onSubmit={handleSubmit} className="p-2">
        <FloatingLabel controlId="floatingInput" label="Tài khoản" className="mb-3">
          <Form.Control type="text" placeholder="Tài khoản" autoComplete="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Mật khẩu">
          <Form.Control type="password" placeholder="Mật khẩu" autoComplete="current-password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
        </FloatingLabel>

        <div className="d-flex justify-content-center align-items-center">
          <Button variant="success" type="submit" className="mt-3" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>

        <Button as={Link} href={"/forgot-password"} variant="link" className="w-100">
          Quên mật khẩu?
        </Button>

        <div className="hk-flex gap-1 mt-2">
          <span className="text-white">Bạn chưa có tài khoản? </span>
          <Button variant="link" as={Link} href={"/register"} className="p-0">
            Đăng ký ngay!
          </Button>
        </div>
      </Form>
    </>
  );
}
