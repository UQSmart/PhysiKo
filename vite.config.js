import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        hitTarget: resolve(__dirname, 'hit-target.html'),
        completeLoop: resolve(__dirname, 'complete-loop.html'),
        putOrbit: resolve(__dirname, 'put-orbit.html'),
        zeroField: resolve(__dirname, 'zero-field.html'),
        keepGas: resolve(__dirname, 'keep-gas.html'),
        coolCoffee: resolve(__dirname, 'cool-coffee.html'),
        tangram: resolve(__dirname, 'tangram.html'),
      },
    },
  },
});
