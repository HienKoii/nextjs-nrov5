import Link from "next/link";
import { Image } from "react-bootstrap";

export default function PostsItem({post}) {
  console.log('post', post)
  return (
    <>
      <div className="post-item gap-2 d-flex align-items-center my-2">
        <div className="post-image">
          <Image src="/imgs/avt.gif" alt="post" width={52} />
        </div>
        <div>
          <div className="hk-flex gap-2">
            <Link href={"/post/1"} className="fw-bold text-danger">
              BẢNG XẾP HẠNG
            </Link>
            <div className="hk-flex gap-2">
              <Image src="/imgs/hot.gif" alt="hot" width={28} />
              <Image src="/imgs/new.gif" alt="new" width={28} />
            </div>
          </div>
          <div className="text-muted font-weight-bold">
            Đã đăng bởi <span className="text-danger fw-bold">Admin</span>
          </div>
        </div>
      </div>
    </>
  );
}
