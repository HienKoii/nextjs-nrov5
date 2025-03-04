import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../Title/Title";
import PostsItem from "./PostsItem";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/context/UserContext";

export default function PostsList() {
  const { user } = useUser();
  const [listPosts, setListPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/posts"); // Đổi API phù hợp với bài viết
        console.log("Lấy danh sách bài viết", response.data);
        setListPosts(response.data); // Giả sử API trả về một mảng bài viết
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết", error);
        setListPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
      {loading ? <p className="text-center text-warning">Đang tải dữ liệu...</p> : listPosts.map((post) => <PostsItem key={post.id} post={post} />)}
    </>
  );
}
