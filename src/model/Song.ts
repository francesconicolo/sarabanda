export interface Song {
  songId: number;
  songDuration?: number;
  songYoutubeUrl?: string;
  songReleaseDate?: string;
  albumTitle?: string;
  authorName: string;
  authorYoutubeChannel?: string;
  songTitle?: string;
  featuringArtistsString?: string;
  featuringArtistsList?: string[];
  dailySong?: false;
  normalizedText?: string;
  songArtistName: string;
  startingSecondsDailySong?: number;
}
