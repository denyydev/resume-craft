"use client";

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import { useMemo } from "react";
import type { ReactNode } from "react";

export function AntdRegistry({ children }: { children: ReactNode }) {
  const cache = useMemo(() => createCache(), []);
  
  useServerInsertedHTML(() => {
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache) }}
      />
    );
  });

  return (
    <StyleProvider cache={cache} hashPriority="high">
      {children}
    </StyleProvider>
  );
}
