export interface Song {
  id: string;
  title: string;
  duration: number;
  youtubeId: string;
  releaseDate: string;
  albumTitle: string;
  albumAuthorsNameList: string[];
  albumThumbnail: string;
  featuringArtistsList: string[];
  fullTitle: string;
  youtubeViews: number;
  dailySong?: boolean;
  startingSecondsSong: number;
}
