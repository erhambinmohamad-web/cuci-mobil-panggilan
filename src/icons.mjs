// Ikon garis sederhana (SVG inline, buatan sendiri) — stroke mengikuti currentColor
const s = (p, size = 26) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

export const icon = {
  car: (z) => s('<path d="M5 17h14M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>', z),
  drop: (z) => s('<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>', z),
  clock: (z) => s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', z),
  shield: (z) => s('<path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>', z),
  calendar: (z) => s('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>', z),
  sparkle: (z) => s('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>', z),
  home: (z) => s('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>', z),
  refresh: (z) => s('<path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4"/>', z),
  seat: (z) => s('<path d="M7 3h6a2 2 0 0 1 2 2v7H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M5 12l-1 6h13l2-6"/><path d="M7 18v3M16 18v3"/>', z),
  window: (z) => s('<path d="M4 16l3-9h10l3 9z"/><path d="M8 11l3-3M11 13l4-4"/>', z),
  engine: (z) => s('<path d="M4 10h2V8h3V6h5v2h3l2 2h1v6h-1l-2 2H9l-2-2H4z"/><path d="M1 11v4M12 11v3"/>', z),
  tire: (z) => s('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>', z),
  wave: (z) => s('<path d="M2 16c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/><path d="M6 11l2-5h8l2 5"/>', z),
  wallet: (z) => s('<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>', z),
  users: (z) => s('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>', z),
  tag: (z) => s('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>', z),
  pin: (z) => s('<path d="M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>', z),
  flask: (z) => s('<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 14h9"/>', z),
  wa: (z = 22) =>
    `<svg width="${z}" height="${z}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/></svg>`,
};

// Ilustrasi hero: mobil + busa sabun (orisinal)
export const heroArt = `
<svg viewBox="0 0 480 400" role="img" aria-label="Ilustrasi mobil sedang dicuci">
  <defs>
    <linearGradient id="gBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14a3b8"/><stop offset="1" stop-color="#0b7285"/></linearGradient>
    <linearGradient id="gGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0f5f8"/><stop offset="1" stop-color="#b6e3ea"/></linearGradient>
    <radialGradient id="gBub" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#d6f0f4"/></radialGradient>
  </defs>
  <circle cx="250" cy="190" r="170" fill="#dff3f6"/>
  <ellipse cx="240" cy="318" rx="190" ry="16" fill="#0b7285" opacity=".12"/>
  <path d="M70 280c0-22 10-34 30-40l52-14 44-46c10-10 22-15 36-15h98c16 0 28 6 38 18l34 42 34 10c16 5 24 16 24 32v18c0 8-6 14-14 14H84c-8 0-14-6-14-14z" fill="url(#gBody)"/>
  <path d="M206 186c7-7 15-10 25-10h40v52h-104zM286 176h36c11 0 19 4 26 12l30 40h-92z" fill="url(#gGlass)"/>
  <path d="M86 262h36M362 262h40" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".85"/>
  <path d="M150 238h270" stroke="#fff" stroke-width="3" opacity=".35"/>
  <circle cx="150" cy="300" r="36" fill="#10242b"/><circle cx="150" cy="300" r="16" fill="#cfd8db"/>
  <circle cx="352" cy="300" r="36" fill="#10242b"/><circle cx="352" cy="300" r="16" fill="#cfd8db"/>
  <path d="M232 196l18-18M300 196l22-20" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>
  <g fill="url(#gBub)" stroke="#9fd8e1" stroke-width="1.5">
    <circle cx="120" cy="120" r="26"/><circle cx="84" cy="168" r="14"/><circle cx="160" cy="84" r="12"/>
    <circle cx="386" cy="108" r="22"/><circle cx="420" cy="150" r="12"/><circle cx="350" cy="70" r="10"/>
    <circle cx="205" cy="240" r="10"/><circle cx="230" cy="232" r="6"/>
  </g>
  <g fill="#ff7a45"><path d="M430 210l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/><path d="M60 214l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/></g>
</svg>`;
