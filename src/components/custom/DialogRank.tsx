import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Medal } from "lucide-react"
import { ChartRank } from "./ChartRank"

export function DialogRank(
  {rank,setRank}:
  {
    rank:Object[],
    setRank:React.Dispatch<React.SetStateAction<{
          statistiche: string;
          green: number;
          red: number;
          yellow: number;
          blue: number;
          white: number;
        }[]>>
  }
) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Medal className="text-white"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[350px]">
        <DialogHeader>
          <DialogTitle>Classifica</DialogTitle>
          <DialogDescription>
          Visualizza la classifica qui. Clicca su "Reset Classifica" per azzerare la classifica.

          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center w-full">
        <ChartRank rank={rank} ></ChartRank>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="destructive" onClick={() => setRank([{statistiche: "Statistiche",green: 0,red:0 ,yellow:0 ,blue: 0,white:0 }])}>Reset Classifica</Button>
           
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
