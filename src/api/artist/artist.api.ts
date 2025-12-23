import axios from 'axios';
import { validateObjectSchema } from 'src/config/zod';
import { Artist } from 'src/model/Artist';
import { responseBaseSchema } from '../baseSchema';
import { artistsSchema } from './validators/schema';
import { FromArtistResponseDtoListToArtistModelList } from './mapper/mapper';

export const ArtistApis = {
  getAllArtists: async (): Promise<Artist[]> => {
    const res = await axios.get(
      import.meta.env.VITE_BASE_URL + '/api/heardle/artist/all'
    );
    const validRes = validateObjectSchema(
      responseBaseSchema(artistsSchema),
      res.data
    );

    return FromArtistResponseDtoListToArtistModelList(validRes.data.artists);
  }
};
