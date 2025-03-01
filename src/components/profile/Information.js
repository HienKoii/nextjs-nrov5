import { useUser } from "@/context/UserContext";
import { formatCurrency, formatTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Table } from "react-bootstrap";

export default function Information() {
  const { user } = useUser();

  return (
    <Table responsive="sm" className="transparent-table">
      <tbody>
        <tr>
          <td className="text-warning">Tài khoản</td>
          <td className="text-white">{user?.username}</td>
        </tr>
        <tr>
          <td className="text-warning">Nhân vật</td>
          <td className="text-white">{user?.name || "Chưa tạo"}</td>
        </tr>
        <tr>
          <td className="text-warning">Mật khẩu</td>
          <td className="text-white">
            {user?.password}{" "}
            <Link href={"/change-password"} className="ms-2 text-warning fst-italic">
              (Đổi mật khẩu)
            </Link>{" "}
          </td>
        </tr>
        <tr>
          <td className="text-warning">Số dư</td>
          <td className="text-white">{formatCurrency(user?.vnd) || "0"} VNĐ</td>
        </tr>
        <tr>
          <td className="text-warning">Tổng nạp</td>
          <td className="text-white">{formatCurrency(user?.tongnap) || "0"} VNĐ</td>
        </tr>
        <tr>
          <td className="text-warning">Trạng thái</td>
          <td className="text-white fw-bold">{user?.active ? <span className="text-warning">Đã kích hoạt</span> : <span className="text-black">Chưa kích hoạt</span>}</td>
        </tr>
        <tr>
          <td className="text-warning">Email</td>
          <td className="text-white">{user?.email || "Không có"}</td>
        </tr>
        <tr>
          <td className="text-warning">Ngày tham gia</td>
          <td className="text-white">{formatTime(user?.create_time)}</td>
        </tr>
      </tbody>
    </Table>
  );
}
