"use client";

import { BasicContactsSection } from "./BasicContactsSection";
import { BasicIdentitySection } from "./BasicIdentitySection";

export function BasicSection() {
  return (
    <>
      <BasicIdentitySection t={t} />
      <BasicContactsSection t={t} />
    </>
  );
}
