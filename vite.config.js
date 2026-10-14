import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { resolve } from 'path';

const root = import.meta.dirname;
const pages = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
  .map((entry) => resolve(root, entry.name));

export default defineConfig({
  build: {
    rollupOptions: {
      input: pages,
    },
  },
});
