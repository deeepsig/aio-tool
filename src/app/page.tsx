import AppClient from '@/components/app-client';

export default function Page() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-[var(--background)] font-sans pt-[15vh]">
      <div className="outer-box">
        {/* This is the "client island" - only this part becomes client-side */}
        <AppClient />
      </div>
    </div>
  );
}
