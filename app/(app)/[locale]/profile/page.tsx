"use client"

import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import "@/types/auth"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const params = useParams() as { locale: "ru" | "en" }
  const locale = params.locale ?? "ru"
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-600">
        Loading...
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-8 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
          <p className="text-sm text-slate-700 mb-4">
            {locale === "ru"
              ? "Чтобы посмотреть профиль, войдите через Google."
              : "You need to sign in with Google to view your profile."}
          </p>
          <button
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-800"
            onClick={() => router.push(`/${locale}`)}
          >
            {locale === "ru" ? "На главную" : "Go to homepage"}
          </button>
        </div>
      </div>
    )
  }

  const user = session.user

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          {locale === "ru" ? "Профиль" : "Profile"}
        </h1>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name ?? "Avatar"}
                className="w-20 h-20 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-500 text-xl">
                {(user.name ?? user.email ?? "?")
                  .toString()
                  .trim()
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <p className="text-xs text-slate-500">
                {locale === "ru" ? "Имя" : "Name"}
              </p>
              <p className="text-sm font-medium text-slate-900">
                {user.name ?? "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Email
              </p>
              <p className="text-sm text-slate-900">
                {user.email ?? "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                {locale === "ru" ? "Google ID" : "Google ID"}
              </p>
              <p className="text-xs text-slate-700 break-all">
                {user.id ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
