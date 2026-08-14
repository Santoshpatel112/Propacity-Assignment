import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received contact form submission:", body);
    return NextResponse.json({ success: true, message: "Inquiry received successfully." });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
