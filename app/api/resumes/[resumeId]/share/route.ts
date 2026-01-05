import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { generateShareId } from "@/lib/generateShareId";

export const runtime = "nodejs";

/**
 * GET /api/resumes/[resumeId]/share
 * Получает статус share для резюме
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { resumeId } = await params;

    if (!resumeId) {
      return NextResponse.json(
        { error: "resumeId is required" },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      select: {
        shareId: true,
        isShared: true,
        userEmail: true,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found" },
        { status: 404 }
      );
    }

    if (resume.userEmail !== userEmail) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const url = new URL(req.url);
    const base = `${url.protocol}//${url.host}`;
    const shareUrl = resume.shareId ? `${base}/r/${resume.shareId}` : null;

    return NextResponse.json({
      shareId: resume.shareId,
      isShared: resume.isShared,
      shareUrl,
    });
  } catch (e) {
    console.error("GET /api/resumes/[resumeId]/share error:", e);
    return NextResponse.json(
      { error: "Failed to get share status" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/resumes/[resumeId]/share
 * Включает share для резюме, генерирует shareId если его нет
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { resumeId } = await params;

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

    // Генерируем shareId если его нет
    let shareId = existingResume.shareId;
    if (!shareId) {
      shareId = generateShareId();
      // Проверяем уникальность (очень маловероятно, но на всякий случай)
      let isUnique = false;
      let attempts = 0;
      while (!isUnique && attempts < 10) {
        const existing = await prisma.resume.findUnique({
          where: { shareId },
        });
        if (!existing) {
          isUnique = true;
        } else {
          shareId = generateShareId();
          attempts++;
        }
      }
    }

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        shareId,
        isShared: true,
        sharedAt: new Date(),
      },
    });

    const url = new URL(req.url);
    const base = `${url.protocol}//${url.host}`;
    const shareUrl = `${base}/r/${shareId}`;

    return NextResponse.json({
      shareUrl,
      shareId: updatedResume.shareId,
      isShared: updatedResume.isShared,
    });
  } catch (e) {
    console.error("POST /api/resumes/[resumeId]/share error:", e);
    return NextResponse.json(
      { error: "Failed to enable share" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/resumes/[resumeId]/share
 * Выключает share для резюме (но сохраняет shareId для возможного повторного использования)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { resumeId } = await params;

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

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        isShared: false,
        // shareId оставляем, чтобы можно было повторно включить с тем же ID
      },
    });

    return NextResponse.json({
      isShared: updatedResume.isShared,
    });
  } catch (e) {
    console.error("DELETE /api/resumes/[resumeId]/share error:", e);
    return NextResponse.json(
      { error: "Failed to disable share" },
      { status: 500 }
    );
  }
}

