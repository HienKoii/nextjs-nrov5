import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.sieuthicode.net/historyapivcbv2/1ebc31d16b276aab316f8087fdfba227", {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Call API failed" }, { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      total: data.transactions?.length || 0,
      data,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error", detail: error.message }, { status: 500 });
  }
}
