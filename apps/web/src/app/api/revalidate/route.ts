import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { path, token } = await req.json();

    if (token !== process.env.REVALIDATION_SECRET && process.env.NODE_ENV === "production") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    return NextResponse.json({ message: "Missing path" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
