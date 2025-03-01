import { useUser } from "@/context/UserContext";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button, Image } from "react-bootstrap";

export default function AuthNavLogin() {
  const { handleLogout, user } = useUser();
  return (
    <div className="mt-4">
      <div className="text-center">
        <Image src={`/imgs/${user?.gender ? user?.gender : "user"}.png`} alt="avatar" width={45} />
      </div>
      <Link href={"/profile"} className="text-center">
        <div>
          <span style={{ color: "#ffe7e7" }}>Xin chào, </span> <span className="text-warning">{user?.username} </span>
        </div>
        <div>
          <span style={{ color: "#ffe7e7" }}> Bạn đang có:</span> <span className="text-warning"> {formatCurrency(user?.vnd)} VNĐ </span>
        </div>
      </Link>
      <div className="text-center">
        <Button
          variant="link"
          className="text-warning mt-2" //
          onClick={() => handleLogout()}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
