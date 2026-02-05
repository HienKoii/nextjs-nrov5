import useConfig from "@/hooks/useConfig";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { motion } from "framer-motion";
const Logo = ({ width = 320 }) => {
  const { config } = useConfig();
  return (
    <Link href="/" className="hk-flex">
      <motion.img
        src={config?.logoUrl}
        alt="logo"
        width={width}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Link>
  );
};

export default Logo;
