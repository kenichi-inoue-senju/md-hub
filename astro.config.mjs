import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';
import { remarkDefaultFrontmatter } from './remark-default-frontmatter.mjs';

// 環境変数を読み込む (第3引数を '' にすることで全ての変数を取得)
// ローカル: .env ファイルから、CI (GitHub Actions): process.env から取得
const fileEnv = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const SITE = process.env.SITE || fileEnv.SITE;
const BASE = process.env.BASE || fileEnv.BASE;

// https://astro.build/config
export default defineConfig({
  site: SITE || undefined,
  base: BASE || undefined,
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkDefaultFrontmatter],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
