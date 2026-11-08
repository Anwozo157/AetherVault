/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // AetherVault brand tokens. Use these names instead of raw hex values.
      colors: {
        aether: {
          green: '#00FF9D', // healthy / primary action
          cyan: '#00F0FF', // telemetry / info accent
          amber: '#FFB800', // warning
          red: '#FF3B30', // critical / degraded
          orange: '#FF9500', // elevated risk
          slate: '#0D0F12', // brand matte slate (logo background)
          panel: '#0B0F17', // card / panel surface
          ink: '#050505', // page background
        },
      },
    },
  },
  plugins: [],
};
