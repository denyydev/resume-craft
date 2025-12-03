import "antd/dist/reset.css"
import "./globals.css"

export const metadata = {
  title: "Resume Builder",
  description: "Create resume easily",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100">{children}</body>
    </html>
  )
}
