// src/app/page.tsx
import Main from '@/components/main/main';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] font-sans">
      <div className="outer-box">
        <Main />
      </div>
    </div>
  );
}
