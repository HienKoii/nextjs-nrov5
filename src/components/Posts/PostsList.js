import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../Title/Title";
import PostsItem from "./PostsItem";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/context/UserContext";

export default function PostsList({ posts }) {
  const { user } = useUser();
  const listPosts = posts || [];
  console.log("listPosts", listPosts);
  const token = localStorage.getItem("token");

  return (
    <>
      <Title title="Bài viết mới" />
      {token && user?.is_admin ? (
        <Button
          as={Link}
          href="post/create" //
          variant="success"
          size="sm"
        >
          <FontAwesomeIcon icon={faEdit} /> Đăng bài
        </Button>
      ) : null}
      {listPosts.map((post) => (
        <PostsItem key={post.id} post={post} />
      ))}
    </>
  );
}
