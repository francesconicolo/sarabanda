import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';


export function TooltipCustom({ testo }: { testo: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="pointer-events-auto">
          <Info />
        </TooltipTrigger>
        <TooltipContent>{testo}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
