import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    // Type-check frontmatter using a schema
    schema: z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const publications = defineCollection({
  loader: glob({ base: "./src/content/publications", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
  title: z.string(),
  venue: z.string(),
  shortVenue: z.string().optional(),
  venueUrl: z.string().url().optional(), // ✅ NEW
  pubDate: z.coerce.date(),
  abstract: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  heroImage: z.string().optional(),
  pdf: z.string().optional(),
  doi: z.string().optional(),
  coAuthors: z.array(z.object({
    name: z.string(),
    scholar: z.string().url(),
  })).optional(),
}),
});

export const collections = { blog, publications };