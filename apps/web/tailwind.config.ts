import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#222222',
        'bg-elev': '#1e1e1e',
        text: '#ffffff',
        'text-muted': 'rgba(255,255,255,0.65)',
        'accent-blue': '#4096ee',
        'accent-cyan': '#39ced6',
        'accent-magenta': '#d6399f',
        'surface-translucent': 'rgba(250,250,250,0.05)',
        'border-translucent': 'rgba(250,250,250,0.25)',
      },
      fontFamily: {
        sans: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        card: '1rem',
        pill: '9999px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4096ee 0%, #d6399f 100%)',
        'gradient-alt': 'linear-gradient(180deg, #4096ee 0%, #39ced6 100%)',
        'gradient-radial': 'radial-gradient(ellipse at top, rgba(64,150,238,0.18), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.05), 0 20px 40px -20px rgba(64,150,238,0.45)',
        card: '0 8px 24px -12px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config