"use client";

import type { Locale } from "@/app/i18n";
import { getLandingMessages } from "@/lib/getLandingMessages";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import { motion, type Variants } from "framer-motion";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  // variable-версия сама подтянется, но weight можно оставить явным
  weight: ["400", "500", "600", "700"],
});

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = { locale: Locale };

export default function Hero({ locale }: Props) {
  const t = getLandingMessages(locale);
  const headlineParts = t.hero.headline.split("{highlight}");

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 12,
          fontSize: 14,
          colorPrimary: "#0b0b0e",
          fontFamily: inter.style.fontFamily,
        },
      }}
    >
      <section
        className={[
          inter.className,
          "relative w-full overflow-hidden bg-white min-h-[100svh] flex items-center",
        ].join(" ")}
      >
        {/* BACKDROP (white + glass + dark gloss) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[860px] w-[860px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.07),transparent_60%)] blur-2xl" />
          <div className="absolute right-[-180px] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.055),transparent_60%)] blur-3xl" />
          <div className="absolute left-[-160px] bottom-[6%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.045),transparent_60%)] blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-4xl">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center"
            >
              {/* TRUST CHIP */}
              <motion.div variants={item} className="mb-8 flex justify-center">
                <div className="relative inline-flex">
                  <span className="absolute -inset-[1px] rounded-full bg-black/10 blur-[2px]" />
                  <div className="relative inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-[12px] leading-5 text-slate-700 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0b0b0e]" />
                    <span className="font-medium">{t.hero.trustSignal}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-medium text-slate-600">Resumify</span>
                  </div>
                </div>
              </motion.div>

              {/* HEADLINE (weights + tracking) */}
              <motion.h1
                variants={item}
                className="
                  text-[44px] leading-[1.04] sm:text-[60px]
                  font-semibold tracking-[-0.03em]
                  text-slate-900 mb-6
                "
              >
                <span className="font-medium text-slate-900/90">
                  {headlineParts[0]}
                </span>
                <span className="relative inline-block text-slate-900 font-semibold">
                  {t.hero.headlineHighlight}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-slate-900/80" />
                </span>
                <span className="font-medium text-slate-900/90">
                  {headlineParts[1]}
                </span>
              </motion.h1>

              {/* SUBHEAD (lighter) */}
              <motion.p
                variants={item}
                className="
                  mx-auto max-w-2xl
                  text-[18px] sm:text-[19px]
                  leading-relaxed
                  text-slate-600
                  font-normal
                  tracking-[-0.01em]
                  mb-10
                "
              >
                {t.hero.subheadline}
              </motion.p>

              {/* CTA ONLY (dark gloss) */}
              <motion.div variants={item} className="mb-12 flex justify-center">
                <div className="relative w-full max-w-[460px]">
                  <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-black/10 blur-2xl opacity-60" />

                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    href={`/${locale}/editor`}
                    className={[
                      "!h-14 !w-full !px-8",
                      "!rounded-2xl",
                      "!border !border-white/10",
                      "!bg-[#0b0b0e] !text-white",
                      "!text-[15px] !font-semibold",
                      "shadow-[0_18px_45px_rgba(0,0,0,0.38)]",
                      "hover:shadow-[0_24px_60px_rgba(0,0,0,0.48)]",
                      "transition-all duration-200",
                      "hover:-translate-y-0.5",
                      "active:!scale-[0.99]",
                      "focus-visible:!ring-2 focus-visible:!ring-black/20",
                      "relative overflow-hidden",
                      // чуть tighter, чтобы выглядело “дороже”
                      "tracking-[-0.01em]",
                    ].join(" ")}
                  >
                    <span className="relative z-10">{t.hero.ctaPrimary}</span>

                    {/* gloss */}
                    <span
                      className="
                        pointer-events-none absolute inset-0
                        before:absolute before:inset-0
                        before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_45%)]
                        before:opacity-80
                      "
                    />
                  </Button>
                </div>
              </motion.div>

              {/* FEATURE CHIPS */}
              <motion.div
                variants={item}
                className="flex flex-wrap items-center justify-center gap-3 text-[12px] text-slate-600"
              >
                {[
                  t.hero.features.atsOptimized,
                  t.hero.features.instantExport,
                  t.hero.features.noSignup,
                ].map((label) => (
                  <span
                    key={label}
                    className="
                      inline-flex items-center gap-2
                      rounded-full border border-black/10
                      bg-white/70 px-3 py-1.5
                      backdrop-blur
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-slate-900" />
                    <span className="font-medium tracking-[-0.01em]">
                      {label}
                    </span>
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}
