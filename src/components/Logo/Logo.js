import useConfig from "@/hook/useConfig";
import Link from "next/link";
import { Image } from "react-bootstrap";

const Logo = ({ width = 320 }) => {
  const { config } = useConfig();
  return (
    <Link href="/" className="hk-flex">
      <Image src={config?.logoUrl} alt="logo" width={width} />
    </Link>
  );
};

export default Logo;
