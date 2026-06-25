import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://thorntonlab.github.io',
	integrations: [mdx(), sitemap()],
    // syntax highlight
    markdown: {
      shikiConfig: {
        theme: 'rose-pine-moon',
      },
    },
    integrations: [mdx()],
});
