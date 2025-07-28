import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State dùng chung
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // State lưu lịch sử
  const [history, setHistory] = useState(null);

  // Hàm call API lịch sử dùng axios
  const fetchHistory = async () => {
    const token = "851601caa8b57859fc0e8b61cdcb2a78";
    console.log('token', token)
    const api = `https://api.sieuthicode.net/historyapivcbv2/${token}`;
    console.log('api', api)
    try {
      const response = await axios.get(api);
      setHistory(response.data);
      console.log('response.data', response)
      return response.data;
    } catch (error) {
      console.error("Fetch history error:", error);
      setHistory(null);
      return null;
    }
  };

  // Gọi fetchHistory 1 lần khi mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // Các giá trị và hàm cập nhật state
  const value = {
    loading,
    setLoading,
    notification,
    setNotification,
    modalOpen,
    setModalOpen,
    fetchHistory,
    history,
    setHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
