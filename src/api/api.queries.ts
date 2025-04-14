import { useQuery } from '@tanstack/react-query';
import { ApiApis } from './api.api';


export const ApiKeys = {
  getSong: ['genericResponse'],
  searchSongUnlimited: (param: string) => ['searchUnlimited', param] as const,
  getById: (id: string) => ['getById', id] as const
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGetSong = (genre: string[], youtubeVisual: number[]) => {
  return useQuery({
    queryKey: ApiKeys.getSong,
    queryFn: () => ApiApis.getUnlimited({genre,youtubeVisual}),
    enabled:false
  });
};

export const useSearchUnlimitedSong = ({
  searchTerm,
  genres,
  youtubeVisual
}: {
  searchTerm: string;
  genres: any;
  youtubeVisual: number[];
}) => {
  return useQuery({
    queryKey: ApiKeys.searchSongUnlimited(searchTerm),
    queryFn: () =>
      searchTerm.length > 3
        ? ApiApis.searchSongUnlimited({ searchTerm, genres, youtubeVisual })
        : Promise.resolve([]) // o puoi restituire un array vuoto, un oggetto vuoto, o un altro valore indicativo
  });
};


export const useSearchByIdSong = (id: string) => {
  return useQuery({
    queryKey: ApiKeys.getById(id),
    queryFn: () => ApiApis.searchByIdSong({idSong: id}),
  });
};

