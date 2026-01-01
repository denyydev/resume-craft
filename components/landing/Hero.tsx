"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import { motion, type Variants } from "framer-motion";
import React from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/14 bg-white/[0.06] px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <div className="text-sm font-semibold text-white">{value}</div>
      <div className="mt-0.5 text-xs text-white/60">{label}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/14 bg-white/[0.07] px-3 py-1 text-xs text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:bg-white/[0.10]">
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <ConfigProvider
      theme={{
        token: { borderRadius: 14, fontSize: 14, colorPrimary: "#A78BFA" },
      }}
    >
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-52 left-[-18%] h-[560px] w-[560px] rounded-full bg-violet-600/16 blur-3xl" />
          <div className="absolute -bottom-56 right-[-18%] h-[640px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.45))]" />
        </div>

        <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            <motion.h1
              variants={item}
              className="text-balance text-4xl font-bold leading-[1.02] tracking-[-0.04em] md:text-6xl"
            >
              Резюме, которое{" "}
              <span className="bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                проходит ATS
              </span>{" "}
              и читается как продукт.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/62 md:text-lg"
            >
              ATS-совместимые шаблоны под роли, аккуратная структура и экспорт в
              один клик. Без воды. Без визуального шума. Только смысл и сильная
              типографика.
            </motion.p>

            <motion.div variants={item} className="mt-8">
              <Button
                type="primary"
                size="large"
                className="!h-11 !rounded-2xl !border-0 !px-5 !text-zinc-950
                           !bg-gradient-to-r !from-violet-200 !to-fuchsia-200
                           hover:!from-violet-100 hover:!to-fuchsia-100
                           active:!from-violet-300 active:!to-fuchsia-300
                           !shadow-[0_10px_30px_-14px_rgba(168,85,247,0.65)]"
                icon={<ArrowRightOutlined />}
                href="/ru/editor"
              >
                Создать резюме
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-0.5 rounded-[28px] bg-[linear-gradient(135deg,rgba(167,139,250,0.22),rgba(236,72,153,0.14),rgba(255,255,255,0.06))] blur-xl" />
            <div className="relative rounded-[28px] border border-white/12 bg-white/[0.035] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-white/65">
                  Output &amp; Structure
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-3 py-1 text-xs text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                  Ready to export
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
                <Stat label="Экспорт" value="PDF + DOCX" />
                <Stat label="Структура" value="ATS-friendly" />
                <Stat label="Фокус" value="1-page, clean type" />
              </div>

              <div className="mt-5">
                <div className="text-xs font-medium text-white/60">
                  What you get
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Tag>No clutter</Tag>
                  <Tag>Role templates</Tag>
                  <Tag>Fast editing</Tag>
                  <Tag>Clean hierarchy</Tag>
                </div>
              </div>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>
    </ConfigProvider>
  );
}
