import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const { data, locale, title } = body;

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

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const resumeId = url.searchParams.get("resumeId");

    if (!resumeId) {
      return NextResponse.json(
        { error: "resumeId is required" },
        { status: 400 }
      );
    }

    const existingResume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!existingResume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    if (existingResume.userEmail !== userEmail) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { data, locale, title } = body;

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        locale: locale ?? existingResume.locale,
        title: title ?? existingResume.title ?? data?.position ?? "",
        data,
      },
    });

    return NextResponse.json({ id: updatedResume.id });
  } catch (e) {
    console.error("PUT /api/resumes error:", e);
    return NextResponse.json(
      { error: "Failed to update resume" },
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
