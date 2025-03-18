"use client";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MainLayout from "./main";
import useConfig from "@/hooks/useConfig";

export default function RootLayout({ children }) {
  const { config } = useConfig();

  return (
    <html lang="en">
      <head>
        <title>{config?.title}</title>
        <meta name="description" content={config?.description} />
      </head>
      <body
        style={{
          backgroundImage: "url('/imgs/bg3.jpg')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <MainLayout id="__next">{children}</MainLayout>
      </body>
    </html>
  );
}
