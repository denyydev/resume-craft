"use client"

import React from "react"
import { Inter } from "next/font/google"
import LandingBackground from "./LandingBackground"
import HeroSection from "./HeroSection"
import StatsSection from "./StatsSection"
import FeaturesSection from "./FeaturesSection"
import TestimonialsSection, { WhatInsideSection } from "./WhatInsideSection"
import CtaSection from "./CtaSection"
import { RoadmapSection } from "./RoadmapSection"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

export default function LandingPage() {
  return (
    <div className={inter.className}>
      <LandingBackground />
      <div className="pt-16">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <WhatInsideSection />
        <RoadmapSection />
        <CtaSection />
      </div>
    </div>
  )
}
