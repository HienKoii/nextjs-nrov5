"use client";
import { useUser } from "@/context/UserContext";
import useConfig from "@/hook/useConfig";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Image, Table } from "react-bootstrap";

export default function PaymentAtmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { config } = useConfig();
  const { user } = useUser();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  return (
    <div>
      <div className="text-center fw-semibold text-white">
        <Table responsive="sm" hover className="transparent-table">
          <tbody>
            <tr>
              <td className="text-white">Ngân hàng</td>
              <td className="text-white">{config?.payment?.atm?.nameStk}</td>
            </tr>
            <tr>
              <td className="text-white">Chủ tài khoản</td>
              <td className="text-white">{config?.payment?.atm?.name}</td>
            </tr>
            <tr>
              <td className="text-white">Số tài khoản</td>
              <td className="text-white">{config?.payment?.atm?.stk}</td>
            </tr>
            <tr>
              <td className="text-white">Số tiền</td>
              <td className="text-white">{formatCurrency(searchParams.get("amount"))}</td>
            </tr>
            <tr>
              <td className="text-white">Nội dung</td>
              <td className="text-white">
                {user?.id} {searchParams.get("trans_id")}
              </td>
            </tr>
          </tbody>
        </Table>
        <div>
          <p className="fs-5">Quét mã để thanh toán</p>
          <Image
            src={`https://img.vietqr.io/image/${config?.payment?.atm?.key}-${config?.payment?.atm?.stk}-compact.png?amount=${searchParams.get("amount")}&addInfo=${user?.id}%20${searchParams.get("trans_id")}`} //
            alt="qr" //
            width={250}
          />
        </div>
        <div className="hk-flex p-2 mt-2">
          <Link href={"/payment/history"} className="text-warning">
            Kiểm tra lịch sử nạp
          </Link>
        </div>
        <p className="fs-6 mt-3">
          - Lưu ý khi thanh toán: Giao dịch trên hoàn toàn được kiểm duyệt tự động, yêu cầu kiểm tra kỹ nội dung chuyển tiền trước khi thực hiện chuyển. Nếu ghi thiếu, sai hoặc quá 10 phút không thấy cộng tiền, các bạn
          hãy liên hệ với Admin để được hỗ trợ
        </p>
      </div>
    </div>
  );
}
