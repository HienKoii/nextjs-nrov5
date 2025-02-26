import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

export default function Navigation() {
  return (
    <div className="hk-flex gap-4 my-3 flex-wrap">
      <Button as={Link} href="/" variant="success">
        Trang chủ
      </Button>
      <Button as={Link} href="/download" variant="success">
        Tải game
      </Button>
      <Button as={Link} href="/naptien" variant="success">
        Nạp tiền
      </Button>
      <Button as={Link} href="/giftCode" variant="success">
        GiftCode
      </Button>
    </div>
  );
}
