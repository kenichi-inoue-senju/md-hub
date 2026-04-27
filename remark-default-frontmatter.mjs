import path from 'node:path';

const LAYOUT_ABS = path.resolve(process.cwd(), 'src/layouts/DocLayout.astro');

export function remarkDefaultFrontmatter() {
  return function (_tree, file) {
    if (!file.data?.astro) return;
    const frontmatter = file.data.astro.frontmatter;

    if (!frontmatter.layout) {
      const fileDir = path.dirname(file.path);
      let rel = path.relative(fileDir, LAYOUT_ABS).split(path.sep).join('/');
      if (!rel.startsWith('.')) rel = './' + rel;
      frontmatter.layout = rel;
    }

    if (!frontmatter.title) {
      frontmatter.title = path.basename(file.path, path.extname(file.path));
    }
  };
}
