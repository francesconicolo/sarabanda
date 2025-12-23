import { useQuery } from '@tanstack/react-query';
import { ArtistApis } from './artist.api';

export const ArtistKeys = {
  all: ['artist', 'all'] as const,
  byId: (artistId: string) => ['artist', 'byId', artistId] as const
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGetAllArtistsQuery = () => {
  return useQuery({
    queryKey: ArtistKeys.all,
    queryFn: () => ArtistApis.getAllArtists(),
    refetchOnWindowFocus: false
  });
};
