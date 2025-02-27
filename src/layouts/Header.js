import Logo from "@/components/Logo";
import Link from "next/link";
import { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";

export default function Header() {
  return (
    <Card>
      <Card.Body>
        <div className="hk-flex-col-y">
          <Logo />
          <div className="hk-flex mt-4 gap-2">
            <Button as={Link} href="/login" variant="success" size="sm">
              Đăng nhập
            </Button>
            <Button as={Link} href="/register" variant="success" size="sm">
              Đăng ký
            </Button>
          </div>
        </div>

        <hr />
        <div className="hk-flex">
          <ul>
            <li>
              <Button variant="link" href="/" className="hk-flex gap-2" style={{ textDecoration: "none" }}>
                <Image src="/imgs/hot.gif" alt="logo" width={24} />
                <span className="text-warning">Tham nhóm zalo ngay</span>
                <Image src="/imgs/hot.gif" alt="logo" width={24} />
              </Button>
            </li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
}
