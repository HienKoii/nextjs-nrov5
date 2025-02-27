import Link from "next/link";
import { Image } from "react-bootstrap";

const Logo = ({ width = 320 }) => {
  return (
    <Link href="/" className="hk-flex">
      <Image src="/imgs/logo.png" alt="logo" width={width} />
    </Link>
  );
};

export default Logo;
