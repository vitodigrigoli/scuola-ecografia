/* Genera i segnaposto delle immagini ecografiche (800×600) finché il cliente non fornisce le originali.
   Uso: node content/casi/_make-placeholders.js */
const fs = require('fs');
const path = require('path');

const SHOTS = [
  ['sovraspinato-asse-corto', 'Sovraspinato, asse corto: calcificazione'],
  ['sovraspinato-asse-lungo', "Sovraspinato, asse lungo: cono d'ombra incompleto"],
  ['sovraspinato-controlaterale', 'Sovraspinato controlaterale'],
  ['borsa-sasd', 'Borsa subacromion-subdeltoidea (SASD)'],
  ['clb', 'Capo lungo del bicipite (CLB)'],
  ['sottospinato', 'Sottospinato'],
  ['sottoscapolare', 'Sottoscapolare'],
  ['recesso-posteriore', 'Recesso posteriore'],
  ['acromion-claveare', 'Acromion-claveare'],
];

// Finto B-mode: fondo nero, settore con gradiente e rumore, righe di scala, etichetta.
const svg = (label, seed) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="Immagine ecografica segnaposto: ${label}">
  <defs>
    <linearGradient id="tissue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d8d8d8"/><stop offset=".22" stop-color="#8a8a8a"/>
      <stop offset=".55" stop-color="#4a4a4a"/><stop offset="1" stop-color="#141414"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed="${seed}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".55"/></feComponentTransfer>
      <feBlend in2="SourceGraphic" mode="multiply"/>
    </filter>
    <clipPath id="fan"><path d="M400 20 L760 560 Q400 620 40 560 Z"/></clipPath>
  </defs>
  <rect width="800" height="600" fill="#000"/>
  <g clip-path="url(#fan)">
    <rect width="800" height="600" fill="url(#tissue)" filter="url(#grain)"/>
    <path d="M60 300 Q400 250 740 320" fill="none" stroke="#f2f2f2" stroke-width="7" opacity=".5"/>
    <path d="M60 380 Q400 340 740 400" fill="none" stroke="#cfcfcf" stroke-width="4" opacity=".35"/>
  </g>
  <g fill="#fff" font-family="DM Sans, Segoe UI, sans-serif">
    <text x="28" y="44" font-size="22" font-weight="700">${label}</text>
    <text x="28" y="70" font-size="15" opacity=".65">Immagine segnaposto · in attesa dell'originale ANFI</text>
    <g opacity=".7">
      ${Array.from({ length: 11 }, (_, i) => `<line x1="772" y1="${90 + i * 40}" x2="${i % 5 === 0 ? 748 : 760}" y2="${90 + i * 40}" stroke="#fff" stroke-width="2"/>`).join('')}
    </g>
  </g>
</svg>`;

const dir = path.join(__dirname, '..', '..', 'assets', 'img', 'casi', 'spalla-10');
fs.mkdirSync(dir, { recursive: true });
SHOTS.forEach(([slug, label], i) => fs.writeFileSync(path.join(dir, slug + '.svg'), svg(label, i + 3)));
console.log('segnaposto scritti:', SHOTS.length);
