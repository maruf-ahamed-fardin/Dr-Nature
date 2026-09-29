import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // In production this uploads to S3 or Cloudinary.
    // For demo/starter, return a mock URL.
    return NextResponse.json({
      url: `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80`,
      filename: file.name,
      size: file.size,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
