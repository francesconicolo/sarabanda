
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FormSearch } from "./FormSearch"
import { useState } from "react";
import { Settings } from "lucide-react";


export function DialogForm({
  setGenreQuery,
  setYoutubeVisual,
  youtubeVisual,
  genreQuery,
  setMode,
  mode
}: {
  setGenreQuery: React.Dispatch<React.SetStateAction<string[]>>;
  setYoutubeVisual: React.Dispatch<React.SetStateAction<number[]>>;
  youtubeVisual: number[];
  genreQuery: string[];
  setMode:React.Dispatch<React.SetStateAction<"Random" | "Scegli">>;
  mode: "Random" | "Scegli";
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Settings />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambia genere e difficoltà!</DialogTitle>
          <DialogDescription>
            Aggiungi, togli, cambia, mettiti alla prova con i diversi filtri!
          </DialogDescription>
        </DialogHeader>
          <FormSearch
          setGenreQuery={setGenreQuery}
          setYoutubeVisual={setYoutubeVisual}
          youtubeVisual={youtubeVisual}
          genreQuery={genreQuery}
          closeDialog={setIsOpen}
          setMode={setMode}
          mode={mode}
        ></FormSearch>
      </DialogContent>
    </Dialog>
  )
}
