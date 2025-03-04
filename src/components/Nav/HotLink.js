import useConfig from "@/hook/useConfig";
import React from "react";
import { Button, Image } from "react-bootstrap";

export default function HotLink() {
  const { config } = useConfig();

  return (
    <>
      {config?.hotLink && (
        <>
          <hr className="m-0" />
          <div className="hk-flex pt-2">
            <ul>
              {config?.hotLink.map((item, index) => {
                return (
                  <li key={index}>
                    <Button variant="link" href={item?.href} className="hk-flex gap-2" style={{ textDecoration: "none" }}>
                      <Image src="/imgs/hot.gif" alt="logo" width={24} />
                      <span className="text-warning">{item?.text}</span>
                      <Image src="/imgs/hot.gif" alt="logo" width={24} />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
