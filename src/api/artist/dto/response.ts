import { z } from 'zod';
import { artistSchema } from '../validators/schema';

export type ArtistResponseDTO = z.infer<typeof artistSchema>;
