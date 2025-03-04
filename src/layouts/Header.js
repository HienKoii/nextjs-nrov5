import Logo from "@/components/Logo/Logo";
import AuthNavDefault from "@/components/Nav/AuthNavDefault";
import AuthNavLogin from "@/components/Nav/AuthNavLogin";
import HotLink from "@/components/Nav/HotLink";
import { useUser } from "@/context/UserContext";
import { Card } from "react-bootstrap";

export default function Header() {
  const { user } = useUser();
  return (
    <Card>
      <Card.Body>
        <div className="hk-flex-col-y">
          <Logo />
          {user ? <AuthNavLogin /> : <AuthNavDefault />}
        </div>
        <HotLink />
      </Card.Body>
    </Card>
  );
}
