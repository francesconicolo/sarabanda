import { z } from 'zod';
import { songSchema } from '../validators/schema';

export type SongResponseDTO = z.infer<typeof songSchema>;
