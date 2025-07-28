import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State dùng chung
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isPayment, setIsPayment] = useState(localStorage.getItem("isPayment") || false);

  const fetchHistory = async () => {
    try {
      const tokenAtm = "851601caa8b57859fc0e8b61cdcb2a78";
      const api = `https://api.sieuthicode.net/historyapivcbv2/${tokenAtm}`;
      const response = await axios.get(api);
      setHistory(response.data);
      const res = await axios.post("api/payment/atm", response.data.transactions);
      console.log("Kết quả cộng tiền: ", res.data);
    } catch (error) {
      console.error("Fetch history error:", error);
      setHistory(null);
    }
  };

  // Chỉ gọi fetchHistory khi có token và isPayment là true
  useEffect(() => {
    let intervalId;
    if (token && isPayment === "true") {
      fetchHistory();
      intervalId = setInterval(() => {
        fetchHistory();
      }, 5000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [token, isPayment]);

  // Các giá trị và hàm cập nhật state
  const value = {
    loading,
    setLoading,
    fetchHistory,
    history,
    setHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
