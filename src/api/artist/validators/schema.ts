import { z } from 'zod';

export const artistSchema = z.object({
  id: z.number(),
  name: z.string(),
  songsCount: z.number(),
  youtubeArtistId: z.string().nullable()
});

export const artistsSchema = z.object({
  artists: z.array(artistSchema)
});
