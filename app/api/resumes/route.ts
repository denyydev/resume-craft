import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("POST /api/resumes body:", body); // для отладки

    const { data, locale, title, userEmail } = body;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized: no userEmail in body" },
        { status: 401 }
      );
    }

    const resume = await prisma.resume.create({
      data: {
        userEmail,
        locale: locale ?? "ru",
        title: title ?? data?.position ?? "",
        data,
      },
    });

    return NextResponse.json({ id: resume.id });
  } catch (e) {
    console.error("POST /api/resumes error:", e);
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const userEmail = url.searchParams.get("userEmail");

    if (id) {
      const resume = await prisma.resume.findUnique({ where: { id } });
      if (!resume) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ resume });
    }

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: { userEmail },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ resumes });
  } catch (e) {
    console.error("GET /api/resumes error:", e);
    return NextResponse.json(
      { error: "Failed to load resumes" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const userEmail = url.searchParams.get("userEmail");

    if (!id || !userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resume = await prisma.resume.findUnique({ where: { id } });
    if (!resume) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (resume.userEmail !== userEmail) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.resume.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/resumes error:", e);
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    );
  }
}
