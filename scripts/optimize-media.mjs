/**
 * Gera versões otimizadas da mídia do portfólio, SEM tocar nos originais.
 *
 *  - Imagens (.png/.jpg/.jpeg) -> <nome>.md.webp (900px) e <nome>.lg.webp (1600px)
 *  - Vídeos (.mp4/.m4v)        -> <nome>.web.mp4 (H.264, lado menor <= 1080px, faststart)
 *
 * Uso:  npm run optimize:media
 * Já existente = pulado (rode de novo após adicionar novos arquivos).
 */
import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const ROOT = path.resolve('public/portfolio');
const IMG_RE = /\.(png|jpe?g)$/i;
const VID_RE = /\.(mp4|m4v)$/i;
const DERIVED_RE = /\.(md|lg)\.webp$|\.web\.mp4$/i;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const base = (f) => f.replace(/\.[^.]+$/, '');
const mb = (n) => (n / 1048576).toFixed(1) + 'MB';

async function optimizeImage(file) {
  const meta = await sharp(file).metadata();
  for (const [suffix, width, quality] of [['md', 900, 78], ['lg', 1600, 82]]) {
    const target = `${base(file)}.${suffix}.webp`;
    if (existsSync(target)) continue;
    await sharp(file)
      .resize({ width: Math.min(width, meta.width ?? width), withoutEnlargement: true })
      .webp({ quality })
      .toFile(target);
  }
}

function optimizeVideo(file) {
  const target = `${base(file)}.web.mp4`;
  if (existsSync(target)) return Promise.resolve();
  const scale = "scale='if(gt(iw,ih),-2,min(1080,iw))':'if(gt(iw,ih),min(1080,ih),-2)'";
  return new Promise((resolve, reject) => {
    const p = spawn(
      ffmpegPath,
      ['-y', '-v', 'error', '-i', file, '-vf', scale, '-c:v', 'libx264', '-preset', 'fast', '-crf', '27',
        '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '112k', '-movflags', '+faststart', target],
      { stdio: ['ignore', 'inherit', 'inherit'] },
    );
    p.on('error', reject);
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg saiu com ${code}: ${file}`))));
  });
}

async function pool(items, limit, worker) {
  let i = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (i < items.length) {
        const item = items[i++];
        try {
          await worker(item);
        } catch (err) {
          console.error('FALHA:', item, err.message);
        }
      }
    }),
  );
}

const files = (await walk(ROOT)).filter((f) => !DERIVED_RE.test(f));
const images = files.filter((f) => IMG_RE.test(f));
const videos = files.filter((f) => VID_RE.test(f));
console.log(`${images.length} imagens, ${videos.length} vídeos`);

await pool(images, 4, optimizeImage);
console.log('Imagens prontas.');

let n = 0;
await pool(videos, 2, async (f) => {
  await optimizeVideo(f);
  const t = `${base(f)}.web.mp4`;
  console.log(`[${++n}/${videos.length}] ${path.basename(f)}: ${mb((await stat(f)).size)} -> ${mb((await stat(t)).size)}`);
});
console.log('Concluído.');
