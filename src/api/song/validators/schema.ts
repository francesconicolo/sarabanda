import { z } from 'zod';

export const songSchema = z.object({
  songId: z.number(),
  songTitle: z.string(),
  songDuration: z.number(),
  songYoutubeId: z.string(),
  songReleaseDate: z.string(),
  albumTitle: z.string(),
  albumAuthorsNamesList: z.array(z.string()),
  albumThumbnail: z.string(),
  featuringArtistsList: z.array(z.string()),
  songTitleWithAuthorsNamesAndFeaturingNames: z.string(),
  youtubeViews: z.number(),
  dailySong: z.boolean().optional(),
  startingSecondsSong: z.number().optional()
});

export const songsSchema = z.object({
  songs: z.array(songSchema)
});
