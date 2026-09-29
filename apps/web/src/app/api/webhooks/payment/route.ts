import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received Payment Webhook callback:", body);

    // Handles bKash / SSLCommerz IPN
    return NextResponse.json({
      status: "SUCCESS",
      received: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }
}
