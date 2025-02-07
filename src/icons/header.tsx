export const Menu = (p) => (
  <svg
    {...p}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    width={24}
    height={24}
    stroke-width={1.5}
  >
    <path d="M10 6h10"></path> <path d="M4 12h16"></path>
    <path d="M7 12h13"></path> <path d="M4 18h10"></path>
  </svg>
);

export const Search = (p) => (
  <svg
    {...p}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    width="24"
    height="24"
    stroke-width="1.5"
  >
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
    <path d="M21 21l-6 -6"></path>
  </svg>
);

export const Hour = (p) => (
  <svg
    {...p}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width={2}
  >
    <circle stroke="currentColor" class="cls-1" cx="16" cy="16" r="10" />
    <polyline
      stroke="currentColor"
      class="cls-1"
      points="18.83 18.83 16 16 16 12"
    />
  </svg>
);
