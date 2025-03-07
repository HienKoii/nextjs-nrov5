"use client";
import { useUser } from "@/context/UserContext";
import useConfig from "@/hook/useConfig";
import { formatCurrency } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Image, Table } from "react-bootstrap";

export default function PaymentAtmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { config } = useConfig();
  const { user } = useUser();
  const [isChecking, setIsChecking] = useState(true);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const amount = searchParams.get("amount");
  const trans_id = searchParams.get("trans_id");

  // 🔥 Kiểm tra nếu chưa đăng nhập → Chuyển hướng về trang chủ
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  // 🔥 Lưu giao dịch khi trang được tải
  useEffect(() => {
    if (!user?.id || !amount || !trans_id) return;

    const saveTransaction = async () => {
      try {
        const response = await axios.post("/api/payment/atm/create", {
          user_id: user.id,
          amount,
          trans_id,
        });

        if (!response.data.success) {
          setIsChecking(false);
        }
      } catch (error) {
        console.error("❌ Lỗi khi lưu giao dịch:", error);
      }
    };

    saveTransaction();
  }, [user?.id, amount, trans_id]);

  // 🔥 Kiểm tra giao dịch tự động
  const checkTransaction = useCallback(async () => {
    if (!amount || !user?.id || !trans_id || transactionSuccess) return;

    try {
      const response = await axios.get("https://api.sieuthicode.net/historyapivcbv2/851601caa8b57859fc0e8b61cdcb2a78");
      const data = response.data;

      if (data.status === "success" && Array.isArray(data.transactions)) {
        const transaction = data.transactions.find(
          (t) => t.description.includes(user.id) && t.description.includes(trans_id)
        );

        if (transaction) {
          await axios.post("/api/payment/atm/update", {
            trans_id,
            amount: transaction.amount,
            user_id: user.id,
          });

          setTransactionSuccess(true);
          alert(`🎉 Nạp tiền thành công! Số tiền: ${transaction.amount} VND`);
          setIsChecking(false);
        }
      }
    } catch (error) {
      console.error("❌ Lỗi khi kiểm tra giao dịch:", error);
    }
  }, [amount, user?.id, trans_id, transactionSuccess]);

  useEffect(() => {
    const interval = setInterval(checkTransaction, 20000);
    const timeout = setTimeout(() => {
      alert("⚠ Nếu sau 10 phút chưa thấy tiền vào tài khoản, vui lòng liên hệ Admin.");
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [checkTransaction]);

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
              <td className="text-white">{formatCurrency(amount)}</td>
            </tr>
            <tr>
              <td className="text-white">Nội dung</td>
              <td className="text-white">
                {user?.id} {trans_id}
              </td>
            </tr>
          </tbody>
        </Table>
        <div>
          <p className="fs-5">Quét mã để thanh toán</p>
          <Image
            src={`https://img.vietqr.io/image/${config?.payment?.atm?.key}-${config?.payment?.atm?.stk}-compact.png?amount=${amount}&addInfo=${user?.id}%20${trans_id}`}
            alt="qr"
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
          hãy liên hệ với Admin để được hỗ trợ.
        </p>
      </div>
    </div>
  );
}
