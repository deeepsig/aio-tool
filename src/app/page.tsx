// src/app/page.tsx
import Main from '@/components/main/main';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] font-sans">
      <div className="outer-box space-y-3">
        <h2 className="ml-2 text-base">Analyze AOI</h2>
        <Main />
      </div>
    </div>
  );
}
