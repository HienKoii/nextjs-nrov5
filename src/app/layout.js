"use client";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MainLayout from "./main";
import useConfig from "@/hooks/useConfig";
import { AppProvider } from "@/context/AppContext";

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
          backgroundImage: `url(${config?.backgroundUrl})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <AppProvider>
          <MainLayout id="__next">{children}</MainLayout>
        </AppProvider>
      </body>
    </html>
  );
}
