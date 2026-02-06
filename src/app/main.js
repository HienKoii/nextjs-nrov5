"use client";
import NoticeMarquee from "@/components/Marquee/NoticeMarquee";
import Navigation from "@/components/Nav/Navigation";
import NotificationModal from "@/components/Notification/NotificationModal";
import Posts from "@/components/Posts/Posts";
import { UserProvider } from "@/context/UserContext";
import useConfig from "@/hooks/useConfig";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Introduce from "@/layouts/Introduce";
import React from "react";
import { Card, Container } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

export default function MainLayout({ children }) {
  const { config } = useConfig();

  return (
    <>
      {/* <SakuraEffect /> */}
      <Container className="px-2 px-md-4">
        <div className="main">
          <UserProvider>
            <ToastContainer />
            <Header />
            <Navigation />

            {config?.thongBao?.is && (
              <>
                <NotificationModal config={config} />
                <NoticeMarquee text={config?.thongBao?.marquee} />
              </>
            )}
            <Card>
              <Card.Body className="gap-2">{children}</Card.Body>
            </Card>
            <Introduce />
            <Footer />
          </UserProvider>
        </div>
      </Container>
    </>
  );
}
