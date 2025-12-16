import { NextRequest, NextResponse } from "next/server";
import playwright from "playwright";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { id, locale } = await req.json();

    if (!id || !locale) {
      return NextResponse.json(
        { error: "Missing id or locale" },
        { status: 400 }
      );
    }

    const url = new URL(req.url);
    const base = `${url.protocol}//${url.host}`;
    const target = `${base}/${locale}/print/${id}`;

    console.log("PDF target URL:", target);

    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();

    await page.goto(target, { waitUntil: "networkidle" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${id}.pdf"`,
      },
    });
  } catch (e) {
    console.error("POST /api/pdf error:", e);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
