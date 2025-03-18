"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import useConfig from "@/hooks/useConfig";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { loading: configLoading } = useConfig();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    setUser(null); // Cập nhật trạng thái user thành null
    window.location.href = "/login";
  };

  if (loading || configLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", paddingLeft: "17px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return <UserContext.Provider value={{ user, setUser, handleLogout, loading }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
