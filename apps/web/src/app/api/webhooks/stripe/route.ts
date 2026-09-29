import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    // Stripe webhook verification
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
