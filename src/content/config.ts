import { defineCollection, z } from 'astro:content';

const tipsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    emoji: z.string().default('💡'),
    description: z.string(),
    category: z.string().default('Đời sống'),
    tags: z.array(z.string()).default([]),
    verified: z.boolean().default(true),
    readTimeMinutes: z.number().default(3),
    updatedDate: z.string(),
    quickTakeaways: z.array(z.string()).default([]),
  }),
});

export const collections = {
  tips: tipsCollection,
};
