import AppClient from '@/components/app-client';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] font-sans">
      <div className="outer-box space-y-[14px]">
        <h2 className="px-2 text-base text-[#D9D9D9] font-semibold">
          AIO Analyzer
        </h2>
        {/* This is the "client island" - only this part becomes client-side */}
        <AppClient />
      </div>
    </div>
  );
}
