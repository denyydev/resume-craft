import React from "react";

type A4PreviewFrameProps = {
  children: React.ReactNode;
  scale?: number;
};

export function A4PreviewFrame({
  children,
  scale = 0.82,
}: A4PreviewFrameProps) {
  const W = 794;
  const H = 1123;

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="h-[calc(100dvh-9rem)] overflow-auto py-4">
          <div
            className="relative origin-top-left"
            style={{
              width: W * scale,
              height: H * scale,
            }}
          >
            <div
              className="origin-top-left"
              style={{
                width: W,
                height: H,
                transform: `scale(${scale})`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
