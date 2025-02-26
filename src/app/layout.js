"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/layouts/Header";
import Navigation from "@/components/Navigation";
import { Card } from "react-bootstrap";
import Footer from "@/layouts/Footer";
import Introduce from "@/layouts/Introduce";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Header />
            <Navigation />
            <Card>
              <Card.Body>{children}</Card.Body>
            </Card>
            <Introduce/>
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
