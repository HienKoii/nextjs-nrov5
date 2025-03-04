"use client";
import { Card } from "react-bootstrap";

export default function Title({ title, color }) {
  return (
    <>
      <Card.Title className={`text-${color ? color : "white"}`}>{title}</Card.Title>
      <hr />
    </>
  );
}
