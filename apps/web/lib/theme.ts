export const theme = {
  colors: {
    bg: '#222222',
    bgElev: '#1e1e1e',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.65)',
    accentBlue: '#4096ee',
    accentCyan: '#39ced6',
    accentMagenta: '#d6399f',
    surfaceTranslucent: 'rgba(250,250,250,0.05)',
    borderTranslucent: 'rgba(250,250,250,0.25)',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #4096ee 0%, #d6399f 100%)',
    alt: 'linear-gradient(180deg, #4096ee 0%, #39ced6 100%)',
    radial: 'radial-gradient(ellipse at top, rgba(64,150,238,0.18), transparent 60%)',
  },
} as const