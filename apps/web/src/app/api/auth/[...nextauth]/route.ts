import { NextRequest, NextResponse } from "next/server";

// NextAuth route handler stub
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Auth route active" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Auth session initiated" });
}
