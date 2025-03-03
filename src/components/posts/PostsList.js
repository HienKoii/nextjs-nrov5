import { useEffect, useState } from "react";
import axios from "axios";
import Title from "../profile/Title/Title";
import PostsItem from "./PostsItem";

export default function PostsList() {
  const [listPosts, setListPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {loading ? <p className="text-center text-warning">Đang tải dữ liệu...</p> : listPosts.map((post) => <PostsItem key={post.id} post={post} />)}
    </>
  );
}
