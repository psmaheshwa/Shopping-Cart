import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import viteVue from '@vitejs/plugin-vue';

export default defineConfig({
  integrations: [vue()],
});
