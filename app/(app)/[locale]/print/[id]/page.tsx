import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ResumePrint } from "@/components/resume/ResumePrint"
import type { ResumeData } from "@/types/resume"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

interface PrintPageProps {
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function PrintPage(props: PrintPageProps) {
  const { locale, id } = await props.params

  console.log("PrintPage params resolved:", { locale, id })

  if (!id) {
    console.warn("PrintPage: no id in params")
    notFound()
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { id },
    })

    if (!resume) {
      console.warn("PrintPage: resume not found", { id })
      notFound()
    }

    return (
      <ResumePrint
        data={resume.data as ResumeData}
        locale={locale}
      />
    )
  } catch (error) {
    console.error("PrintPage error:", error)
    throw error
  }
}
