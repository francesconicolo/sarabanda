import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useState } from 'react';
import { SliderPopularity } from './SliderPopularity';




const items = [
  'Rap, Hip-Hop e Trap',
  'Jazz e Fusion',
  'Musica Tradizionale e Folk Italiana',
  'Musica Classica e Opera',
  'Pop Italiano e Musica Leggera',
  'House/Elettronica',
  'Rock e Derivati',
  'Colonne Sonore e Musica da Film'
];

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.'
  })
});

export function FormSearch({
  genreQuery,
  setGenreQuery,
  setYoutubeVisual,
  youtubeVisual,
  closeDialog,
  setMode,
  mode
}: {
  setGenreQuery: React.Dispatch<React.SetStateAction<string[]>>;
  setYoutubeVisual: React.Dispatch<React.SetStateAction<number[]>>;
  youtubeVisual: number[];
  genreQuery: string[];
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>; // Aggiungi la prop per chiudere il dialog
  setMode: React.Dispatch<React.SetStateAction<"Random" | "Scegli">>;
  mode: "Random" | "Scegli";
}) {
  const [localVisual, setLocalVisual] = useState<number[]>(youtubeVisual);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: genreQuery
    }
  });

  const handleFormSubmit = (data: z.infer<typeof FormSchema>) => {
    setGenreQuery(data.items);
    setYoutubeVisual(localVisual);
    closeDialog(false);
  };
  
  const handleModeChange = () => {
    if (mode === 'Random') {
      setGenreQuery(items);
      setYoutubeVisual([0]);
      setMode('Scegli');
    } else {
      setGenreQuery(['Rap, Hip-Hop e Trap', 'Pop Italiano e Musica Leggera']);
      setYoutubeVisual( [50]);
      setMode('Random');
    }
    closeDialog(false);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="mx-16">
              {items.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
              <SliderPopularity
                valuePopularity={localVisual}
                setPopularity={setLocalVisual}
              />
            </FormItem>
          )}
        />
        <div className='text-center'>
          <Button type="button" variant={'destructive'} onClick={() => form.handleSubmit(handleModeChange)()}>
            Cambia modalità
          </Button>
        </div>
        <div className='text-center'>
          <Button type="submit" onClick={() => form.handleSubmit(handleFormSubmit)()}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
