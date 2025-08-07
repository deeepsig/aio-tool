interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  'aria-label'?: string;
}

// TODO: Make button styling more consistent

export default function NavButton({
  children,
  onClick,
  disabled = false,
  active = false,
  'aria-label': ariaLabel,
}: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        cursor-pointer 
        transition-all duration-100 ease-in-out
        rounded 
        text-sm 
        disabled:opacity-40 
        disabled:cursor-not-allowed 
        hover:opacity-80 
        hover:bg-white/8
        hover:px-2 hover:py-1
        hover:-mx-2 hover:-my-1
        ${active ? 'font-medium text-[#ededed]' : 'font-light text-[#ededed]/80'}
      `}
      type="button"
      aria-current={active ? 'page' : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
