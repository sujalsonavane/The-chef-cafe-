export function CornerFlourish() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="curtain-corner-svg"
      aria-hidden="true"
    >
      {/* Outer corner line */}
      <path
        d="M3 61V18C3 9.7157 9.7157 3 18 3H61"
        stroke="#d4af37"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Secondary inner line */}
      <path
        d="M8 61V22C8 14.268 14.268 8 22 8H61"
        stroke="rgba(212, 175, 55, 0.45)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Filigree corner scroll work */}
      <path
        d="M6 6C15 6 21 12 21 21C21 27 17 31 12 30C8 29 6 25 7 21C8 17 12 15 16 16C19 17 20 20 19 23"
        stroke="#d4af37"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M6 6C6 15 12 21 21 21C27 21 31 17 30 12C29 8 25 6 21 7C17 8 15 12 16 16C17 19 20 20 23 19"
        stroke="#d4af37"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Center gold bead accent */}
      <circle cx="21" cy="21" r="2.5" fill="#d4af37" />
      {/* Tendril leaf 1 */}
      <path
        d="M27 9C25 15 29 23 36 24C41 25 45 22 45 18C45 14 40 11 35 13C32 14 30 17 31 20"
        stroke="rgba(212, 175, 55, 0.75)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* Tendril leaf 2 */}
      <path
        d="M9 27C15 25 23 29 24 36C25 41 22 45 18 45C14 45 11 40 13 35C14 32 17 30 20 31"
        stroke="rgba(212, 175, 55, 0.75)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* Small corner leaf tick */}
      <path
        d="M13 5L5 13"
        stroke="#d4af37"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
