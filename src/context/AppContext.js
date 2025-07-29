import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State dùng chung
  const [loading, setLoading] = useState(false);

  const fetchAutoDeposit = async () => {
    try {
      const { data } = await axios.get("https://api.sieuthicode.net/historyapivcbv2/851601caa8b57859fc0e8b61cdcb2a78");
      const transactions = data?.transactions;
      if (Array.isArray(transactions) && transactions.length > 0) {
        // Chỉ gửi dữ liệu cần thiết
        const res = await axios.post("/api/payment/atm", { transactions });
        // Log kết quả nếu cần debug
        // console.log("Kết quả cộng tiền: ", res.data);
      }
    } catch (error) {
      // Chỉ log lỗi khi thực sự cần thiết
      // console.error("Fetch history error:", error);
    }
  };

  // Các giá trị và hàm cập nhật state
  const value = {
    loading,
    setLoading,
    fetchAutoDeposit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
