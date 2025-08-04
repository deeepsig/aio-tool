// src/app/page.tsx
import InfoPanel from '@/components/info-panel/info-panel';
import Main from '@/components/main/main';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] font-sans">
      <div className="outer-box space-y-[14px]">
        <h2 className="ml-2 text-lg">Analyze AOI</h2>
        <Main />
        <InfoPanel />
      </div>
    </div>
  );
}
