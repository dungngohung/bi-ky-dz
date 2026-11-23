/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          '"Apple Color Emoji"',
          'Arial',
          'sans-serif',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ],
        mono: [
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ]
      },
      colors: {
        notion: {
          bg: '#ffffff',
          bgDark: '#191919',
          sidebar: '#f7f6f3',
          sidebarDark: '#202020',
          text: '#37352f',
          textDark: '#e6e6e6',
          muted: '#787774',
          mutedDark: '#999999',
          border: '#e9e9e7',
          borderDark: '#2e2e2e',
          hover: '#f1f1ef',
          hoverDark: '#282828',
          // Notion Callout Pastels
          gray: '#f1f1ef',
          brown: '#f4eeee',
          orange: '#fbecdd',
          yellow: '#fbf3db',
          green: '#edf3ec',
          blue: '#e7f3f8',
          purple: '#f4f0f7',
          pink: '#fbf1f5',
          red: '#fdebec',
          // Dark Callouts
          grayDark: '#252525',
          greenDark: '#1f2e23',
          blueDark: '#192b37',
          yellowDark: '#362f1a',
          redDark: '#381f21',
          orangeDark: '#362619'
        }
      }
    },
  },
  plugins: [],
}
