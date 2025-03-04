import { formatTime } from "@/lib/utils";
import Link from "next/link";
import { Image } from "react-bootstrap";

export default function PostsItem({ post }) {
  return (
    <>
      <div className="post-item gap-2 d-flex align-items-center my-2">
        <div className="post-image">
          <Image src="/imgs/avt.gif" alt="post" width={52} />
        </div>
        <div>
          <div className="hk-flex-x gap-2">
            <Link href={`/post/${post?.id}`} className="text-primary text-uppercase" style={{ display: "inline" }}>
              <span style={{ fontSize: "12px" }} className="fw-semibold me-1">
                {post?.tieude}
              </span>
              {post?.hot ? <Image src="/imgs/hot.gif" alt="hot" width={24} style={{ verticalAlign: "middle" }} /> : null}
              {post?.new ? <Image src="/imgs/new.gif" alt="new" width={24} style={{ verticalAlign: "middle" }} /> : null}
            </Link>
          </div>
          <div style={{ fontSize: "12px" }}>
            Đã đăng bởi <span className="text-danger fw-bold me-1">{post?.username}</span>|<span className="ms-1 text-primary">{formatTime(post?.created_at)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
