import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

export default function Navigation() {
  return (
    <div className="hk-flex gap-4 my-1 flex-wrap hk-nav p-3">
      <Button as={Link} href="/" variant="success">
        Trang chủ
      </Button>
      <Button as={Link} href="/download" variant="success">
        Tải game
      </Button>
      <Button as={Link} href="/payment" variant="success">
        Nạp tiền
      </Button>
      <Button as={Link} href="/giftCode" variant="success">
        GiftCode
      </Button>
    </div>
  );
}
