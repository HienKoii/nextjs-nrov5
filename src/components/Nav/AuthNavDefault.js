import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

export default function AuthNavDefault() {
  return (
    <>
      <div className="hk-flex mt-4 gap-2">
        <Button as={Link} href="/login" variant="success" size="sm">
          Đăng nhập
        </Button>
        <Button as={Link} href="/register" variant="success" size="sm">
          Đăng ký
        </Button>
      </div>
      <Link className="text-warning text-center my-3" href={"/forgot-password"}>
        Quên mật khẩu ?
      </Link>
    </>
  );
}
