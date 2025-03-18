"use client";
import SakuraEffect from "@/components/Effect/Sakura";
import Navigation from "@/components/Nav/Navigation";
import NotificationModal from "@/components/Notification/NotificationModal";
import { UserProvider } from "@/context/UserContext";
import useConfig from "@/hooks/useConfig";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Introduce from "@/layouts/Introduce";
import React from "react";
import { Card } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export default function MainLayout({ children }) {
  const { config } = useConfig();

  return (
    <>
      <SakuraEffect />
      <div className="container">
        <div className="main">
          <UserProvider>
            <ToastContainer />
            <Header />
            <Navigation />
            {config?.thongBao?.is && <NotificationModal />}
            <Card>
              <Card.Body>{children}</Card.Body>
            </Card>
            <Introduce />
            <Footer />
          </UserProvider>
        </div>
      </div>
    </>
  );
}
