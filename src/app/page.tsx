import Navbar from '@/components/navbar/navbar'; // Update import path as needed
import Main from '@/components/main-card/main';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] font-sans">
      <div className="outer-box space-y-[14px]">
        <h2 className="px-2 text-base text-[#D9D9D9] font-semibold">
          AIO Analyzer
        </h2>
        <Main />
        <Navbar />
      </div>
    </div>
  );
}
