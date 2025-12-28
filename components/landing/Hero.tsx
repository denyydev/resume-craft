"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import { motion } from "framer-motion";
import { useMemo } from "react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type Pill = {
  text: string;
  tone?: "violet" | "fuchsia" | "neutral";
};

export default function Hero() {
  const pills: Pill[] = useMemo(
    () => [
      { text: "ATS", tone: "violet" },
      { text: "PDF", tone: "neutral" },
      { text: "DOCX", tone: "neutral" },
      { text: "FASTEST", tone: "fuchsia" },
      { text: "Templates", tone: "neutral" },
      { text: "Modern UI", tone: "neutral" },
    ],
    []
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 14,
          fontSize: 14,
          colorPrimary: "#7c3aed",
        },
      }}
    >
      <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-[-12%] h-[560px] w-[560px] rounded-full bg-violet-600/18 blur-3xl" />
          <div className="absolute -bottom-44 right-[-12%] h-[640px] w-[640px] rounded-full bg-fuchsia-500/14 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
          <div className="hero-grid absolute inset-0 opacity-[0.16]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.35))]" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-16 md:grid-cols-2 md:gap-12 md:pt-24">
          {/* left */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300/80" />
              <span className="font-medium tracking-wide">
                IT Resume Builder
              </span>
              <span className="text-white/45">•</span>
              <span className="text-white/60">PDF / DOCX</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl"
            >
              <span className="font-light text-white/85">Собери</span>{" "}
              <span className="font-semibold">резюме</span>{" "}
              <span className="font-light text-white/80">для</span>{" "}
              <span className="bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text font-semibold text-transparent">
                найма
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 text-base leading-relaxed text-white/60 md:text-lg"
            >
              Шаблоны под роли, ATS-friendly структура и экспорт за секунды.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button
                type="primary"
                size="large"
                className="!h-11 !rounded-2xl !px-5"
                icon={<ArrowRightOutlined />}
              >
                Создать резюме
              </Button>

              <Button
                size="large"
                className="!h-11 !rounded-2xl !px-5 !border-white/15 !bg-white/5 !text-white hover:!bg-white/10"
              >
                Шаблоны
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap gap-2 text-xs text-white/55"
            >
              {[
                "ATS-ready",
                "1-page layout",
                "Clean typography",
                "No clutter",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* right: animated tokens */}
          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center">
            {/* base glow card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[380px] w-full rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
            >
              {/* inner highlight */}
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,58,237,0.22),transparent_55%)]" />
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_70%_70%,rgba(236,72,153,0.18),transparent_55%)]" />

              {/* big words */}
              <motion.div
                className="absolute left-6 top-6 select-none text-5xl font-semibold tracking-[-0.04em] text-white/90 md:text-6xl"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                FAST
                <span className="font-light text-white/55">EST</span>
              </motion.div>

              <motion.div
                className="absolute bottom-8 right-7 select-none text-5xl font-semibold tracking-[-0.04em] text-white/85 md:text-6xl"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 7.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                  ATS
                </span>
              </motion.div>

              {/* orbit pills */}
              <Orbit pills={pills} />

              {/* center micro line */}
              <div className="absolute left-1/2 top-1/2 h-[1px] w-[62%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25" />

              {/* subtle corner note */}
              <div className="absolute bottom-4 left-5 text-xs text-white/45">
                Export in seconds • clean output
              </div>
            </motion.div>

            {/* outer floating dots */}
            <FloatingDots />
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
}

function Orbit({ pills }: { pills: Pill[] }) {
  // positions around the card
  const spots = [
    "left-6 top-44",
    "left-16 top-20",
    "right-10 top-24",
    "right-8 top-52",
    "left-24 bottom-14",
    "right-24 bottom-20",
  ];

  return (
    <>
      {pills.map((p, i) => (
        <motion.div
          key={p.text}
          className={cn("absolute", spots[i % spots.length])}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.12 + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
            transition={{
              duration: 5.2 + i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className={cn(
              "inline-flex items-center rounded-2xl border px-4 py-2 text-sm font-medium backdrop-blur-xl",
              p.tone === "violet" &&
                "border-violet-200/15 bg-violet-500/10 text-violet-50",
              p.tone === "fuchsia" &&
                "border-fuchsia-200/15 bg-fuchsia-500/10 text-fuchsia-50",
              (!p.tone || p.tone === "neutral") &&
                "border-white/10 bg-black/30 text-white/80"
            )}
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-white/35" />
            <span className="tracking-wide">{p.text}</span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

function FloatingDots() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/20"
          style={{
            left: `${10 + ((i * 8) % 80)}%`,
            top: `${12 + ((i * 11) % 70)}%`,
          }}
          animate={{ y: [0, -10, 0], opacity: [0.18, 0.35, 0.18] }}
          transition={{
            duration: 4.5 + i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}
