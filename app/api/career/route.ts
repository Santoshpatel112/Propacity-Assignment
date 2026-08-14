import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received career application:", body);
    return NextResponse.json({ success: true, message: "Application submitted successfully." });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
