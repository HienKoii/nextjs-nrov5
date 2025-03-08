"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminTypePage() {
  const { user } = useUser();
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token || (token && !user?.is_admin)) {
      router.push("/");
    }
  }, [token, user, router]);

  return <div>AdminTypePage</div>;
}
