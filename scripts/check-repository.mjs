import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

// These are the agreed minimum files for the current Vite application.
// Update the list through a PR if the project structure intentionally changes.
const requiredFiles = [
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'src/lib/supabase.js',
];

const requiredAssets = [
  'public/favicon.svg',
  'public/icons.svg',
  'src/assets/logo.svg',
];

const failures = [];

for (const file of [...requiredFiles, ...requiredAssets]) {
  const absolutePath = resolve(process.cwd(), file);
  if (!existsSync(absolutePath)) {
    failures.push(`Missing: ${file}`);
  } else if (!statSync(absolutePath).isFile()) {
    failures.push(`Not a file: ${file}`);
  } else if (statSync(absolutePath).size === 0) {
    failures.push(`Empty file: ${file}`);
  }
}

// Vite checks imported assets during the build, but URLs in public/
// can be plain strings. Verify static asset URLs used by index.html.
if (existsSync('index.html')) {
  const html = readFileSync('index.html', 'utf8');
  const assetUrl = /\b(?:src|href)\s*=\s*["'](\/[^"']+\.(?:svg|png|jpe?g|webp|gif|ico|avif|woff2?|ttf)(?:[?#][^"']*)?)["']/gi;
  for (const [, url] of html.matchAll(assetUrl)) {
    const relative = url.split(/[?#]/)[0].replace(/^\//, '');
    const target = relative.startsWith('src/') ? relative : `public/${relative}`;
    if (!existsSync(resolve(process.cwd(), target))) {
      failures.push(`Broken index.html asset URL: ${url} (expected ${target})`);
    }
  }
}

if (failures.length) {
  for (const problem of failures) console.error(`::error::${problem}`);
  console.error(`Repository validation failed (${failures.length} issue(s)).`);
  process.exitCode = 1;
} else {
  console.log(`Repository validation passed (${requiredFiles.length} files, ${requiredAssets.length} assets).`);
}
