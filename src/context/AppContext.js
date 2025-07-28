import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State dùng chung
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await axios.post("api/payment/atm");
      console.log("Kết quả cộng tiền: ", res.data);
    } catch (error) {
      console.error("Fetch history error:", error);
    }
  };

  // Các giá trị và hàm cập nhật state
  const value = {
    loading,
    setLoading,
    fetchHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
