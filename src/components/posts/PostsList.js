import Title from "../Title/Title";
import PostsItem from "./PostsItem";

export default function PostsList() {
  // Tạo mảng giả có độ dài 3
  const fakePosts = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    title: `Bài viết ${index + 1}`,
    content: `Nội dung bài viết ${index + 1}`,
  }));

  return (
    <>
      <Title title="Bài viết mới" />
      {fakePosts.map((post) => (
        <PostsItem key={post.id} post={post} />
      ))}
    </>
  );
}
