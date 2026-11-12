export function SignalIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="3.2" fill="currentColor" />
      <path d="M15 15a13 13 0 0 0 0 18M33 15a13 13 0 0 1 0 18M9.5 9.5a20.5 20.5 0 0 0 0 29M38.5 9.5a20.5 20.5 0 0 1 0 29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}