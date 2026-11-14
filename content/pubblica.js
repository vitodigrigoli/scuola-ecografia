/* Pubblicazione su scuoladiecografia.com (SiteGround).
   Uso: node content/pubblica.js [percorso-zip]
        (default: scuoladiecografia-sito.zip sul Desktop)

   1. rigenera il sito in PRODUZIONE (content/config.js: Il metodo e casi clinici nascosti,
      indicizzazione attiva);
   2. crea lo zip con i soli file pubblici, alla radice dell'archivio: da caricare in
      public_html con Gestione File di Site Tools ed estrarre lì;
   3. rigenera il sito in ANTEPRIMA, così il repository (e GitHub Pages) resta com'era.

   Nello zip: gli *.html in radice (tranne _preview.html), favicon.ico, site.webmanifest,
   robots.txt, sitemap.xml, assets/ (senza le immagini dei casi se sono nascosti), css/, js/.
   Non entrano content/, design-reference/, README.md. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const zip = path.resolve(process.argv[2] || path.join(os.homedir(), 'Desktop', 'scuoladiecografia-sito.zip'));

// generatori nell'ordine giusto: prima quelli specifici, build-pages per ultimo
const generatori = ['build-relatori.js', 'build-program.js', 'build-prenota.js', 'build-casi.js', 'build-caso.js', 'build-metodo.js', 'build-pages.js'];
const genera = (sito) => {
  console.log(`\n— sito in ${sito}`);
  for (const g of generatori) {
    execFileSync(process.execPath, [path.join(__dirname, g)], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'], env: { ...process.env, SITO: sito } });
  }
};

genera('produzione');
// la configurazione di produzione, letta in un processo con SITO=produzione
const prod = JSON.parse(execFileSync(process.execPath, ['-p', "JSON.stringify(require('./content/config'))"], { cwd: ROOT, env: { ...process.env, SITO: 'produzione' } }).toString());

try {
  const pagine = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !f.startsWith('_'));
  const file = [...pagine, 'favicon.ico', 'site.webmanifest', 'robots.txt', 'sitemap.xml', 'assets', 'css', 'js'];
  const escludi = prod.casiOnline ? [] : ['--exclude', 'assets/img/casi'];
  if (fs.existsSync(zip)) fs.unlinkSync(zip);
  // tar di Windows (bsdtar): crea zip con percorsi a barra normale, estraibili da Site Tools
  const tar = process.platform === 'win32' ? path.join(process.env.SystemRoot, 'System32', 'tar.exe') : 'tar';
  execFileSync(tar, ['-a', '-c', '-f', zip, ...escludi, ...file], { cwd: ROOT, stdio: 'inherit' });
  console.log(`\nzip creato: ${zip} (${(fs.statSync(zip).size / 1048576).toFixed(1)} MB)`);
  console.log('pagine: ' + pagine.join(', '));
} finally {
  genera('anteprima');
  console.log('\nrepository di nuovo in anteprima');
}
