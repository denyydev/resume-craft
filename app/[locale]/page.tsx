import type { Locale } from "@/app/i18n";
import Hero from "@/components/landing/Hero";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Page(props: Props) {
  const session = await getServerSession(authOptions);
  const { locale } = await props.params;

  if (session) {
    redirect(`/${locale}/editor`);
  }

  return (
    <>
      <LandingHeader locale={locale} />
      <Hero />
    </>
  );
}
