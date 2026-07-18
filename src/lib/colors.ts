export type AccentColor = {
  id: string;
  label: string;
  /** OKLCH L C H — works in both light and dark themes */
  oklch: string;
  /** Foreground text rendered ON the primary-colored background */
  foregroundOklch: string;
};

/**
 * Curated set of accent colors that work on a theatrical stage — chosen for
 * good legibility across both dark (cinematic) and light (daylight) themes.
 */
export const ACCENT_COLORS: AccentColor[] = [
  {
    id: "amber",
    label: "Ambre",
    oklch: "0.74 0.16 72",
    foregroundOklch: "0.04 0 0",
  },
  {
    id: "scarlet",
    label: "Écarlate",
    oklch: "0.58 0.22 25",
    foregroundOklch: "0.97 0 0",
  },
  {
    id: "coral",
    label: "Corail",
    oklch: "0.72 0.18 40",
    foregroundOklch: "0.04 0 0",
  },
  {
    id: "fuchsia",
    label: "Fuchsia",
    oklch: "0.65 0.24 330",
    foregroundOklch: "0.97 0 0",
  },
  {
    id: "violet",
    label: "Violet",
    oklch: "0.62 0.22 305",
    foregroundOklch: "0.97 0 0",
  },
  {
    id: "sapphire",
    label: "Saphir",
    oklch: "0.60 0.18 245",
    foregroundOklch: "0.97 0 0",
  },
  {
    id: "emerald",
    label: "Émeraude",
    oklch: "0.68 0.17 155",
    foregroundOklch: "0.04 0 0",
  },
  {
    id: "cyan",
    label: "Cyan",
    oklch: "0.70 0.14 200",
    foregroundOklch: "0.04 0 0",
  },
];

export const DEFAULT_COLOR_ID = "amber";
