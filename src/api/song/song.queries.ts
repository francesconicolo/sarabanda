import { useQuery } from '@tanstack/react-query';
import { SongApis } from './song.api';

export const SongKeys = {
  daily: ['song', 'daily'] as const,
  getSongUnlimited: (param: string) => ['getUnlimited', param] as const,
  getSongArtist: (param: string) => ['getArtist', param] as const,
  searchSongUnlimited: (param: string) => ['searchUnlimited', param] as const,
  searchDailySong: (param: string) => ['searchDailySong', param] as const,
  searchArtistSong: (param: string) => ['searchArtistSong', param] as const,
  byId: (param: string) => [param] as const
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGetDailySongQuery = () => {
  return useQuery({
    queryKey: SongKeys.daily,
    queryFn: () => SongApis.getDailySong()
  });
};

export const useGetUnlimitedSong = ({
  genres,
  youtubeVisual
}: {
  genres: string[];
  youtubeVisual: number[];
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}) => {
  return useQuery({
    queryKey: SongKeys.getSongUnlimited(genres.join(',')),
    queryFn: () => SongApis.getUnlimitedSong({ genres, youtubeVisual }),
    refetchOnWindowFocus: false
  });
};

export const useGetArtistSongQuery = ({
  youtubeArtistId,
  songIdToExclude
}: {
  youtubeArtistId: string;
  songIdToExclude: string[];
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}) => {
  return useQuery({
    queryKey: SongKeys.getSongArtist(youtubeArtistId),
    queryFn: () => SongApis.getArtistSong(youtubeArtistId, songIdToExclude),
    refetchOnWindowFocus: false,
    enabled: !!youtubeArtistId
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSearchDailySong = (searchTerm: string) => {
  return useQuery({
    queryKey: SongKeys.searchDailySong(searchTerm),
    queryFn: () =>
      searchTerm.length > 3
        ? SongApis.searchDailySong({ searchTerm })
        : Promise.resolve([])
  });
};
export const useSearchUnlimitedSong = (
  searchTerm: string,
  youtubeVisual: number[],
  genres: string[]
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  return useQuery({
    queryKey: SongKeys.searchSongUnlimited(searchTerm),
    queryFn: () =>
      searchTerm.length > 3
        ? SongApis.searchUnlimitedSong({ searchTerm, youtubeVisual, genres })
        : Promise.resolve([])
  });
};
export const useSearchSongArtist = (
  {
    search,
    youtubeArtistId,
    songsIdToExclude
  }: {
    search: string;
    youtubeArtistId: string;
    songsIdToExclude: string[];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  return useQuery({
    queryKey: SongKeys.searchArtistSong(search),
    queryFn: () =>
      SongApis.searchArtistSong(search, youtubeArtistId, songsIdToExclude),
    enabled: !!search && !!youtubeArtistId
  });
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSearchSongById = (songId: string) => {
  return useQuery({
    queryKey: SongKeys.byId(songId),
    queryFn: () => SongApis.searchSongById(songId),
    enabled: !!songId
  });
};
