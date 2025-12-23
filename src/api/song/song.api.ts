import { songSchema, songsSchema } from './validators/schema';

import { FromSongResponseDtoToSongModel } from './mapper/mapper';
import { Song } from 'src/model/Song';
import genresJSON from '../../assets/genres/genresKeys.json';
import axios from 'axios';
import { responseBaseSchema } from '../baseSchema';
import { validateObjectSchema } from '@/config/zod';

export const SongApis = {
  getDailySong: async (): Promise<Song> => {
    const res = await axios.get(
      import.meta.env.VITE_BASE_URL + '/api/heardle/daily'
    );
    const validRes = validateObjectSchema(
      responseBaseSchema(songSchema),
      res.data
    );

    return FromSongResponseDtoToSongModel(validRes.data);
  },

  getUnlimitedSong: async ({
    genres,
    youtubeVisual
  }: {
    genres: string[];
    youtubeVisual: number[];
  }): Promise<Song> => {
    const sottoGeneri = genres
      .map(
        (key) =>
          (
            genresJSON.find((obj) => Object.keys(obj)[0] === key) as
              | Record<string, string[]>
              | undefined
          )?.[key] || []
      )
      .flat();
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + '/api/heardle/unlimited',
      {
        genres: sottoGeneri,
        youtubeVisual: Number(youtubeVisual[0] * 100000)
      }
    );

    const validRes = validateObjectSchema(
      responseBaseSchema(songSchema),
      response.data
    );
    // const num = Math.round(Math.random() * 100);
    // if (num % 2 === 0) {
    //   validRes.data.albumTitle = 'test';
    //   validRes.data.albumThumbnail = 'https://i.ytimg.com/vi/0.jpg';
    //   validRes.data.featuringArtistsList = [];
    //   validRes.data.songYoutubeId = '6ytdEH7kKRU';
    //   validRes.data.songTitle = 'test';
    //   validRes.data.startingSecondsSong = 20;
    // }
    return FromSongResponseDtoToSongModel(validRes.data);
  },

  getArtistSong: async (
    youtubeArtistId: string,
    songIdToExclude: string[]
  ): Promise<Song> => {
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + '/api/heardle/artist/song/random',
      {
        youtubeArtistId,
        songIdToExclude
      }
    );
    const validRes = validateObjectSchema(
      responseBaseSchema(songSchema),
      res.data
    );
    return FromSongResponseDtoToSongModel(validRes.data);
  },

  searchDailySong: async ({
    searchTerm
  }: {
    searchTerm: string;
  }): Promise<{ value: string; label: string }[]> => {
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + '/api/heardle/daily/filtered',
      {
        filter: searchTerm,
        limit: 50
      }
    );
    const validRes = validateObjectSchema(
      responseBaseSchema(songsSchema),
      res.data
    );

    return Promise.all(
      validRes.data.songs.map((song) => ({
        value: `${song.songId}`,
        label: `${song.songTitleWithAuthorsNamesAndFeaturingNames}`
      }))
    );
  },
  searchUnlimitedSong: async ({
    searchTerm,
    youtubeVisual,
    genres
  }: {
    searchTerm: string;
    youtubeVisual: number[];
    genres: string[];
  }): Promise<{ value: string; label: string }[]> => {
    const sottoGeneri = genres
      .map(
        (key) =>
          (
            genresJSON.find((obj) => Object.keys(obj)[0] === key) as
              | Record<string, string[]>
              | undefined
          )?.[key] || []
      )
      .flat();

    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + '/api/heardle/unlimited/filtered',
      {
        filter: searchTerm,
        limit: 50,
        genres: sottoGeneri,
        youtubeVisual: Number(youtubeVisual[0] * 100000)
      }
    );

    const validRes = validateObjectSchema(
      responseBaseSchema(songsSchema),
      res.data
    );

    return Promise.all(
      validRes.data.songs.map((song) => ({
        value: `${song.songId}`,
        label: `${song.songTitleWithAuthorsNamesAndFeaturingNames}`
      }))
    );
  },
  searchArtistSong: async (
    searchValue: string,
    youtubeArtistId: string,
    songIdToExclude: string[]
  ): Promise<{ value: string; label: string }[]> => {
    const res = await axios.post(
      import.meta.env.VITE_BASE_URL + '/api/heardle/artist/songs/filtered',
      {
        youtubeArtistId: youtubeArtistId,
        songIdToExclude: songIdToExclude,
        filter: searchValue,
        limit: 50
      }
    );
    const validRes = validateObjectSchema(
      responseBaseSchema(songsSchema),
      res.data
    );
    return Promise.all(
      validRes.data.songs.map((song) => ({
        value: `${song.songId}`,
        label: `${song.songTitleWithAuthorsNamesAndFeaturingNames}`
      }))
    );
  },
  searchSongById: async (idSong: string): Promise<Song> => {
    const res = await axios.get(
      import.meta.env.VITE_BASE_URL +
        '/api/heardle/song/songId?songId=' +
        idSong
    );
    const validRes = validateObjectSchema(
      responseBaseSchema(songSchema),
      res.data
    );
    return FromSongResponseDtoToSongModel(validRes.data);
  }
};
