import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { TooltipCustom } from './Tooltip';


type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderPopularity({
  className,
  valuePopularity,
  setPopularity,
  ...props
}: SliderProps & {
  valuePopularity: number[];
  setPopularity: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const printValue = (popularity: number[]) => {
    const strPopularity = (popularity[0] * 100000).toString();
    let finalStr = '';

    let count = 0;
    for (let i = strPopularity.length - 1; i >= 0; i--) {
      if (count !== 0 && count % 3 === 0) {
        finalStr = '.' + finalStr; // Add a dot before the number every 3 digits
      }
      finalStr = strPopularity[i] + finalStr; // Prepend the digit to the final string
      count++;
    }
    return 'Ripr. > ' + finalStr;
  };
  return (
    <div className="select-none">
      <div className="mb-2 relative">
        Difficoltà
        <TooltipCustom
          testo={
            'Seleziona il numero minimo di riproduzioni per le canzoni in gara'
          }
        ></TooltipCustom>
      </div>

      <Slider
        defaultValue={valuePopularity}
        max={100}
        min={0}
        step={1}
        onValueChange={(value) => setPopularity(value)} // Cambia il valore localmente con il tipo corretto
        className={cn('w-full', className)}
        {...props}
      />
      <div className="flex justify-between text-[0.7rem]">
        <div>Difficile</div>
        <div>{printValue(valuePopularity)}</div>
        <div>Facile</div>
      </div>
    </div>
  );
}
