"use client";
import PostsList from "@/components/Posts/PostsList";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://api.sieuthicode.net/historyapivcbv2/851601caa8b57859fc0e8b61cdcb2a78");
        console.log("Lấy lịch sử giao dịch ", response);
      } catch (error) {
      } finally {
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <PostsList />
    </>
  );
}
