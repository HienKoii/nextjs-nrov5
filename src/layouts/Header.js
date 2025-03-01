import Logo from "@/components/Logo/Logo";
import AuthNavDefault from "@/components/Nav/AuthNavDefault";
import AuthNavLogin from "@/components/Nav/AuthNavLogin";
import { useUser } from "@/context/UserContext";
import { Button, Card, Image } from "react-bootstrap";

export default function Header() {
  const { user } = useUser();
  return (
    <Card>
      <Card.Body>
        <div className="hk-flex-col-y">
          <Logo />
          {user ? <AuthNavLogin /> : <AuthNavDefault />}
        </div>

        <hr />
        <div className="hk-flex">
          <ul>
            <li>
              <Button variant="link" href="/" className="hk-flex gap-2" style={{ textDecoration: "none" }}>
                <Image src="/imgs/hot.gif" alt="logo" width={24} />
                <span className="text-warning">Tham nhóm zalo ngay</span>
                <Image src="/imgs/hot.gif" alt="logo" width={24} />
              </Button>
            </li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
}
