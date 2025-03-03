"use client";
import TransactionHistory from "@/components/Payment/TransactionHistory";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`/api/payment/history`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Lấy lịch sử nạp thẻ:", response.data);
          setHistory(response.data.history);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Lỗi lấy lịch sử nạp thẻ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p className="text-center text-warning">Đang tải dữ liệu...</p>;
  }

  return <div>{history.length > 0 ? <TransactionHistory history={history} /> : <p>Không có dữ liệu lịch sử</p>}</div>;
}
