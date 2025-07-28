"use client";
import TransactionHistory from "@/components/Payment/TransactionHistory";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function PaymentHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [historyAtm, setHistoryAtm] = useState([]);

  const [loading, setLoading] = useState(true);

  const { fetchHistory: fetchLSGD } = useContext(AppContext);

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
          setHistoryAtm(response.data.historyAtm);
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

  const fetchAutoDeposit = async () => {
    try {
      const res = await axios.post("/api/payment/atm");
      console.log("Kết quả cộng tiền: ", res.data);
    } catch (error) {
      console.error("Fetch history error:", error);
    }
  };

  useEffect(() => {
    // Gọi API ngay khi component mount
    fetchAutoDeposit();

    // Đặt interval gọi API mỗi 15 giây
    const interval = setInterval(() => {
      fetchAutoDeposit();
    }, 15000 * 2);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center text-warning">Đang tải dữ liệu...</p>;
  }

  return <div>{<TransactionHistory history={history} historyAtm={historyAtm} />}</div>;
}
