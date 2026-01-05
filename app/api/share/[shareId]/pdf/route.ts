import { NextRequest, NextResponse } from "next/server";
import playwright from "playwright";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * GET /api/share/[shareId]/pdf
 * Публичный endpoint для генерации PDF резюме по shareId
 * 
 * Защита:
 * - Проверка isShared=true
 * - Rate limiting: TODO (можно добавить in-memory кэш или внешний сервис для serverless)
 * - Cache-Control: private, no-store (PDF может меняться, не кэшируем)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    const { shareId } = await params;

    if (!shareId) {
      return NextResponse.json(
        { error: "shareId is required" },
        { status: 400 }
      );
    }

    // Проверяем существование резюме и что share включен
    const resume = await prisma.resume.findFirst({
      where: {
        shareId,
        isShared: true,
      },
      select: {
        id: true,
        locale: true,
        title: true,
      },
    });

    if (!resume) {
      return NextResponse.json(
        { error: "Resume not found or share is disabled" },
        { status: 404 }
      );
    }

    const url = new URL(req.url);
    const base = `${url.protocol}//${url.host}`;
    // Используем специальную print страницу для share
    const target = `${base}/print/share/${shareId}`;

    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();

    await page.goto(target, { waitUntil: "networkidle" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    const body = new Uint8Array(pdfBuffer);
    const filename = resume.title
      ? `resume-${resume.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.pdf`
      : `resume-${shareId}.pdf`;

    return new NextResponse(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        // PDF может меняться при обновлении резюме, не кэшируем
        "Cache-Control": "private, no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (e) {
    console.error("GET /api/share/[shareId]/pdf error:", e);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

