/* Genera le copertine segnaposto delle schede caso (una per categoria, 800×500).
   Uso: node content/casi/_make-covers.js */
const fs = require('fs');
const path = require('path');

const CATS = [
  ['spalla', 'Spalla', '#7f77dd'],
  ['gomito', 'Gomito', '#5dcaa5'],
  ['polso-mano', 'Polso e mano', '#a855f7'],
  ['anca', 'Anca', '#7fb2dd'],
  ['ginocchio', 'Ginocchio', '#dd9f77'],
  ['caviglia-piede', 'Caviglia e piede', '#77ddc8'],
  ['rachide-addome', 'Rachide e addome', '#c877dd'],
];

// Copertina: settore ecografico stilizzato su fondo scuro con tinta della categoria.
const svg = (label, tint, seed) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500" role="img" aria-label="Copertina segnaposto: ${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d0d10"/><stop offset="1" stop-color="${tint}" stop-opacity=".45"/>
    </linearGradient>
    <linearGradient id="fanfill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".9"/>
      <stop offset=".5" stop-color="#ffffff" stop-opacity=".28"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity=".04"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".25"/></feComponentTransfer>
      <feBlend in2="SourceGraphic" mode="overlay"/>
    </filter>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <g transform="translate(400 40)" filter="url(#noise)">
    <path d="M0 0 L300 430 Q0 480 -300 430 Z" fill="url(#fanfill)"/>
    <path d="M-230 250 Q0 210 230 265" fill="none" stroke="#fff" stroke-width="9" opacity=".55" filter="url(#soft)"/>
    <path d="M-250 330 Q0 296 250 340" fill="none" stroke="#fff" stroke-width="5" opacity=".35"/>
  </g>
</svg>`;

const dir = path.join(__dirname, '..', '..', 'assets', 'img', 'casi', 'cover');
fs.mkdirSync(dir, { recursive: true });
CATS.forEach(([slug, label, tint], i) => fs.writeFileSync(path.join(dir, slug + '.svg'), svg(label, tint, i + 11)));
console.log('copertine scritte:', CATS.length);
