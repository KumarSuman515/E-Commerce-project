import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/mongoose";
import Category from "../../../../../lib/models/Category";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let slug = "";
    let imageUpdate = undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      name = String(form.get("name") || "").trim();
      slug = String(form.get("slug") || "").trim();
      const file = form.get("image");
      if (file && typeof file.arrayBuffer === "function") {
        const arrayBuffer = await file.arrayBuffer();
        imageUpdate = {
          data: Buffer.from(arrayBuffer),
          contentType: file.type || "application/octet-stream",
        };
      }
    } else {
      const body = await request.json();
      name = String(body?.name || "").trim();
      slug = String(body?.slug || "").trim();
    }

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }
    if (!slug) {
      return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    const updateDoc = { name, slug };
    if (imageUpdate) updateDoc.image = imageUpdate;

    const updated = await Category.findByIdAndUpdate(id, updateDoc, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ id: updated._id.toString() });
  } catch (error) {
    console.error("PUT /api/categories/[id] error", error);
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

export async function DELETE(_request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ id });
  } catch (error) {
    console.error("DELETE /api/categories/[id] error", error);
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


