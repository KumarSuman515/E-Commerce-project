import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import Category from "../../../../lib/models/Category";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();
    const docs = await Category.find({}).sort({ createdAt: -1 }).lean();
    const categories = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      slug: d.slug,
      hasImage: Boolean(d.image?.data?.length),
    }));
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/categories error", error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let slug = "";
    let imageBuffer = null;
    let imageType = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      name = String(form.get("name") || "").trim();
      slug = String(form.get("slug") || "").trim();
      const file = form.get("image");
      if (file && typeof file.arrayBuffer === "function") {
        const arrayBuffer = await file.arrayBuffer();
        imageBuffer = Buffer.from(arrayBuffer);
        imageType = file.type || "application/octet-stream";
      }
    } else {
      const body = await request.json();
      name = String(body?.name || "").trim();
      slug = String(body?.slug || "").trim();
      if (body?.imageBase64) {
        const matches = /^data:(.*?);base64,(.*)$/.exec(body.imageBase64);
        if (matches) {
          imageType = matches[1];
          imageBuffer = Buffer.from(matches[2], "base64");
        }
      }
    }

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }
    if (!slug) {
      return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    const created = await Category.create({
      name,
      slug,
      image: imageBuffer
        ? { data: imageBuffer, contentType: imageType }
        : undefined,
    });

    return NextResponse.json(
      {
        id: created._id.toString(),
        name: created.name,
        slug: created.slug,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/categories error", error);
    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


