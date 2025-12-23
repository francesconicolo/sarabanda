import { Artist } from 'src/model/Artist';
import { ArtistResponseDTO } from '../dto/response';

export const FromArtistResponseDtoToArtistModel = (
  source: ArtistResponseDTO
): Artist => {
  return {
    id: source.id,
    name: source.name,
    numberOfSongs: source.songsCount,
    youtubeArtistId: source.youtubeArtistId ?? ''
  };
};

export const FromArtistResponseDtoListToArtistModelList = (
  source: ArtistResponseDTO[]
): Artist[] => {
  return source.map((artist) => FromArtistResponseDtoToArtistModel(artist));
};
