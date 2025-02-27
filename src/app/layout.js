"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/layouts/Header";
import Navigation from "@/components/Navigation";
import { Card } from "react-bootstrap";
import Footer from "@/layouts/Footer";
import Introduce from "@/layouts/Introduce";
import { ToastContainer } from "react-toastify";
import NotificationModal from "@/components/NotificationModal";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: "url('/imgs/bg3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="main">
            <ToastContainer />
            <Header />
            <Navigation />
            <NotificationModal />
            <Card>
              <Card.Body>{children}</Card.Body>
            </Card>
            <Introduce />
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
