import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [topLevelAwait()],
  base: './',

  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main entry point
        page1: 'about.html', 
        page2: 'faq.html',
        page3: 'preorder.html',
      },
    },
  },
});