import { defineCollection, type SchemaContext } from "astro:content";
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const imageSchema = ({ image }: SchemaContext) =>
    z.object({
        image: image(),
        description: z.string().optional(),
    });

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md, mdx}', base: './src/pages/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
  //schema: ({ image }) => z.object({
  //  title: z.string(),
  //  permalink: z.string().optional(),
  //  image: imageSchema({ image })
  //}),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog };
