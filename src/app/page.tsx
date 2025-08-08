import AppClient from '@/components/app-client';
import About from '@/components/misc/about';

export default function Page() {
  return (
    <div className="min-h-screen font-sans">
      <div className="flex flex-col items-center py-[8vh]">
        <About />
        <div className="mt-8 flex items-start justify-center">
          <div className="outer-box space-y-[14px]">
            {/* This is the "client island" - only this part becomes client-side */}
            <AppClient />
          </div>
        </div>
      </div>
    </div>
  );
}
