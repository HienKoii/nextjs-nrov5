"use client";
import TransactionHistory from "@/components/Payment/TransactionHistory";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [historyAtm, setHistoryAtm] = useState([]);

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
      const token = "851601caa8b57859fc0e8b61cdcb2a78";
      const api = `https://api.sieuthicode.net/historyapivcbv2/${token}`;
      const response = await axios.get(api);
      // const response = await axios.post("/api/payment/atm");
      console.log("response.data", response.data);
    } catch (error) {
      // console.error("Lỗi auto deposit:", error);
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
