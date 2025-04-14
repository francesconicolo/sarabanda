import axios from 'axios';
import genreJson from "../assets/genre.json";
import { MusicCategoryKeys } from '@/model/CategoryKeys';
import { Song } from '@/model/Song';


export const ApiApis = {
  async getUnlimited({
    genre,
    youtubeVisual
  }: {
    genre: any;
    youtubeVisual: number[];
  }): Promise<any> {
    function getGenres(genres: MusicCategoryKeys[]): string[] {
      const genreQuery: string[] = [];
      genres.forEach((genre) => {
        if (genreJson[genre]) {
          genreQuery.push(...genreJson[genre]);
        }
      });
      return Array.from(new Set(genreQuery));
    }
    const response = await axios.post(
      "https://be.heardleitalia.com/api/heardle/unlimited",
      {
        genres: getGenres(genre),
        youtubeVisual: Number(youtubeVisual[0] * 100000),
      }
    );
    console.log(response.data);
    return response.data.result.allSongsDto;
  },
  async searchSongUnlimited(
    { 
      searchTerm, 
      genres, 
      youtubeVisual 
    }:{
      searchTerm: string;
      genres: MusicCategoryKeys[];
      youtubeVisual: number[];
  }): Promise<{ value: string; label: string }[]>{
    function getGenres(genres: MusicCategoryKeys[]): string[] {
      // Array per raccogliere tutti i sotto-generi
      const genreQuery: string[] = [];

      // Iteriamo su ogni genere passato
      genres.forEach((genre) => {
        // Controlliamo se il genere esiste in `genreJson` e aggiungiamo i sotto-generi all'array
        if (genreJson[genre]) {
          genreQuery.push(...genreJson[genre]);
        }
      });

      // Rimuoviamo eventuali duplicati
      return Array.from(new Set(genreQuery));
    }
    const response = await axios.post(
      "https://be.heardleitalia.com/api/heardle/unlimited/filtered",
      {
        genres: getGenres(genres),
        youtubeVisual: Number(youtubeVisual[0] * 100000),
        filter: searchTerm,
        limit: 50
      }
    );
    return response.data.result.map((song: Song) => ({
      value: `${song.songId}`,
      label: `${song.songArtistName}`
    }));
  }, 
  async searchByIdSong ({ idSong }: { idSong: string }): Promise<Song>{
    const response = await axios.get(
      'https://be.heardleitalia.com/api/heardle/song?songId=' + idSong
    );
    return response.data.result;
  }
};