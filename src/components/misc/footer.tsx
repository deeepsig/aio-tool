export default function Footer() {
  return (
    <div className="text-center pb-8 pt-8">
      <footer className="font-sans font-normal text-sm text-[#D9D9D9]">
        crafted by{' '}
        <a
          href="https://x.com/deeepsig"
          className="text-[#696969] hover:text-[#A0A0A0] transition-colors duration-200 underline decoration-dotted underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          @deeepsig
        </a>{' '}
      </footer>
    </div>
  );
}
