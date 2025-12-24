
import { useGetUnlimitedSong, useSearchSongById, useSearchUnlimitedSong } from '@/api/song/song.queries';
import { AsyncQueryView } from '@/components/custom/AsyncQueryView';
import CardMusic from '@/components/custom/CardMusic';
import { DialogForm } from '@/components/custom/DialogForm';
import { DialogRank } from '@/components/custom/DialogRank';
import { InputAutoComplete } from '@/components/custom/InputAutoComplete';
import { useDebounce } from '@/components/hooks/useDebounce';

import { TypographyH1 } from '@/components/typography/TypographyH1';


import {LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';


function Home() {
  const [key, setKey] = useState<string>('');
  const [youtubeVisual,setYoutubeVisual]= useState<number[]>([50])
  const [genre,setGenre] = useState<string[]>([
    'Trap e rap',
    'Pop e Hip-Hop'
  ])
  const [rank, setRank] = useState<{statistiche: string,green: number,red: number ,yellow: number ,blue: number,white: number}[]>([{statistiche: "Statistiche",green: 0,red:0 ,yellow:0 ,blue: 0,white:0 }]);
  const [play, setPlay] = useState(false);
  const [mode,setMode] = useState<"Random"|"Scegli">("Random");
  const [searchValue, setSearchValue] = useState<string>(''); // Valore della barra di ricerca
  const [selectedValue, setSelectedValue] = useState<string>('1'); //valore id selezionato
  const [isFocused, setIsFocused] = useState(true);
  // Hook per debouncing sulla ricerca per evitare chiamate API frequenti
  const debouncedSearchValue = useDebounce(searchValue, 500);
  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Aggiungiamo un listener globale per keydown sull'intero documento
    document.addEventListener('keydown', handleKeyDown);
    // Cleanup: rimuoviamo il listener quando il componente viene smontato
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const searchUnlimitedSong = useSearchUnlimitedSong(debouncedSearchValue, youtubeVisual, genre);
  const getUnlimitedSongQuery = useGetUnlimitedSong({
    genres: genre,
    youtubeVisual: youtubeVisual
  });// enabled controlla se il fetch parte
  const getById = useSearchSongById(selectedValue);

  const handleKeyDown = (event: KeyboardEvent) => {
    setKey(event.key);
  };
  
  useEffect(() => {
    if (isFocused)
    {
      switch (key) {
        case '*':
          getUnlimitedSongQuery.refetch();
          setPlay(false);
          break;
        case '+':
          setPlay(true);
          break;
        case '-':
          setPlay(false);
          break;
        //BOTTONE PER AGGIUNGERE 1 AL VERDE
        case '1':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              green: (updated[0].green ?? 0) + 1,
            };
            return updated;
          });
          break;
        //BOTTONE PER AGGIUNGERE 1 AL ROSSO
        case '2':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              red: (updated[0].red ?? 0) + 1,
            };
            return updated;
          });
          break;
        //BOTTONE PER AGGIUNGERE 1 AL GIALLO
        case '3':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              yellow: (updated[0].yellow ?? 0) + 1,
            };
            return updated;
          });
          break;
        //BOTTONE PER AGGIUNGERE 1 AL BLU
        case '4':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              blue: (updated[0].blue ?? 0) + 1,
            };
            return updated;
          });
          break;
        //BOTTONE PER AGGIUNGERE 1 AL WHITE
        case '5':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              white: (updated[0].white ?? 0) + 1,
            };
            return updated;
          });
          break;
        //BOTTONE PER RIMUOVERE 1 AL VERDE
        case '6':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              green: (updated[0].green >0 ? updated[0].green -1 : 0),
            };
            return updated;
          });
          break;
        //BOTTONE PER RIMUOVERE 1 AL ROSSO
        case '7':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              red: (updated[0].red >0 ? updated[0].red -1 : 0),
            };
            return updated;
          });
          break;
        //BOTTONE PER RIMUOVERE 1 AL GIALLO
        case '8':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              yellow: (updated[0].yellow >0 ? updated[0].yellow -1 : 0),
            };
            return updated;
          });
          break;
        //BOTTONE PER RIMUOVERE 1 AL BLU
        case '9':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              blue: (updated[0].blue >0 ? updated[0].blue -1 : 0),
            };
            return updated;
          });
          break;
        //BOTTONE PER RIMUOVERE 1 AL WHITE
        case '0':
          setRank((prevRank) => {
            const updated = [...prevRank];
            updated[0] = {
              ...updated[0],
              white: (updated[0].white > 0 ? updated[0].white -1 : 0),
            };
            return updated;
          });
          break;
      }
    }
  }, [key]);

  useEffect(() => {
    setPlay(false);
  },[mode])

  return (
      <div className='background-home w-full h-screen overflow-hidden'>
        <div className="w-full  container mx-auto">
          <div className='flex  h-16 items-center justify-center text-white gap-8'>
            <DialogRank rank={rank} setRank={setRank}></DialogRank>
            <TypographyH1>{mode}</TypographyH1>
            <DialogForm setGenreQuery={setGenre} setYoutubeVisual={setYoutubeVisual} youtubeVisual={youtubeVisual} genreQuery={genre} setMode={setMode} mode={mode}></DialogForm>
          </div>
          <div className="w-full h-full flex items-center justify-center text-white flex-col">
            <AsyncQueryView
            query={mode === 'Random' ? getUnlimitedSongQuery : getById}
            data={(data) => (
              <>
                {mode === 'Scegli' && <InputAutoComplete selectedValue={selectedValue} onSelectedValueChange={setSelectedValue} searchValue={searchValue} onSearchValueChange={setSearchValue} items={searchUnlimitedSong.data ?? []} isLoading={searchUnlimitedSong.isLoading} setIsFocused={setIsFocused} emptyMessage='Nessun risultato'/>}
              <CardMusic artist={data.albumAuthorsNameList[0]} songName={data.title} albumName={data.albumTitle} date={data.releaseDate} url={data.youtubeId} visual={data.youtubeViews.toString()} playing={play} focus={isFocused} setIsFocused={setIsFocused} setPlaying={setPlay}/>
              </>
            )}
            loading={
              <div className="w-full h-screen flex justify-center items-center animate-spin">
                <LoaderCircle className="size-10" />
              </div>
            }
            error={() => (
              <div className="w-full h-screen flex justify-center items-center">
                <TypographyH1 className="mono">
                  Error 404 - Page not found
                </TypographyH1>
              </div>
            )}
            />
          </div>
        </div>
      </div>
);
}

export default Home;
