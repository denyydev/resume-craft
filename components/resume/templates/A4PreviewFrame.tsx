export function A4PreviewFrame({
  children,
  scale = 0.82, // 0.78–0.86 обычно топ
}: {
  children: React.ReactNode;
  scale?: number;
}) {
  // A4 px размеры твоего шаблона
  const W = 794;
  const H = 1123;

  return (
    <div className="w-full">
      {/* центрируем и даём “воздух” */}
      <div className="flex justify-center">
        {/* viewport: ограничиваем высоту и делаем внутренний скролл */}
        <div className="h-[calc(100dvh-9rem)] overflow-auto py-4">
          {/* zoom frame: задаём реальный размер под scale */}
          <div
            style={{
              width: W * scale,
              height: H * scale,
            }}
            className="relative"
          >
            <div
              style={{
                width: W,
                height: H,
                // zoom влияет на layout — лист не “тащит одеяло”
                zoom: scale as any,
              }}
              className="origin-top-left"
            >
              {children}
            </div>

            {/* fallback, если вдруг zoom не сработает: */}
            <div
              className="pointer-events-none absolute inset-0 origin-top-left"
              style={{
                transform: `scale(${scale})`,
                width: W,
                height: H,
                opacity: 0, // спрятано, это просто на случай если захочешь быстро переключить
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
