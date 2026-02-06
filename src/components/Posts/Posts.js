"use client";

import PostsList from "./PostsList";
import useConfig from "@/hooks/useConfig";

export default function Posts() {
  const { config } = useConfig();
  return (
    <>
      <PostsList posts={config?.dataPosts || []} />
    </>
  );
}
