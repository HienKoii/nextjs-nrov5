"use client";

import { Card } from "react-bootstrap";
import MarqueeLib from "react-fast-marquee";

export default function NoticeMarquee({ text }) {
  if (!text) return null;

  return (
    <Card>
      <Card.Body className="py-2">
        <MarqueeLib speed={60} gradient={false} pauseOnHover>
          <span className="text-warning">{text}</span>
        </MarqueeLib>
      </Card.Body>
    </Card>
  );
}
