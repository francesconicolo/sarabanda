import { Song } from 'src/model/Song';
import { SongResponseDTO } from '../dto/response';

export const FromSongResponseDtoToSongModel = (
  source: SongResponseDTO
): Song => {
  return {
    id: source.songId.toString(),
    title: source.songTitle,
    duration: source.songDuration,
    youtubeId: source.songYoutubeId,
    releaseDate: source.songReleaseDate,
    albumTitle: source.albumTitle,
    albumAuthorsNameList: source.albumAuthorsNamesList,
    albumThumbnail: source.albumThumbnail,
    featuringArtistsList: source.featuringArtistsList ?? [],
    fullTitle: source.songTitleWithAuthorsNamesAndFeaturingNames,
    youtubeViews: source.youtubeViews,
    dailySong: source.dailySong,
    startingSecondsSong: source.startingSecondsSong ?? 0
  };
};

export const FromSongResponseDtoListToSongModelList = (
  source: SongResponseDTO[]
): Song[] => {
  return source.map((song) => FromSongResponseDtoToSongModel(song));
};
