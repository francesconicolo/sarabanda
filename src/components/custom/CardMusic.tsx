import YouTubePlayer from "react-player/youtube";
import { TypographyH3 } from "../typography/TypographyH3";
import { TypographyH4 } from "../typography/TypographyH4";

import { Play } from "lucide-react";

export default function CardMusic({artist,songName,albumName,date,url,visual,playing,focus}: {artist:string,songName:string,albumName:string,date:string,url:string,visual:string,playing:boolean,focus:boolean}) {
  return (
    <div className={"w-[330px] h-[670px] bg-neutral-800 rounded-3xl overflow-hidden border " + (focus ? " border-green-700 " : "border-destructive")}>
       <YouTubePlayer
          width={'100%'}
          height={300}
          controls={false}
          url={'https://www.youtube.com/watch?v='+url}
          playing={playing}

        />
        <div className={("flex justify-center mt-3")+(playing ? " ":" hidden")}>
          <div className="containerWaves">
            <div className="box box1"></div>
            <div className="box box2"></div>
            <div className="box box3"></div>
            <div className="box box4"></div>
            <div className="box box5"></div>
          </div>
        </div>
        <div className={("flex justify-center mt-3")+(!playing ? " ":" hidden")}>
          <Play className="w-12 h-12"/>
        </div>
        <div className="p-4">
          <TypographyH3 className="text-white italic">{songName}</TypographyH3>
          <TypographyH4 className="text-white/50 pt-5 font-medium">Artista: <span className="font-bold text-white">{artist}</span></TypographyH4>
          <TypographyH4 className="text-white/50 pt-3 font-medium">Album: <span className="font-bold text-white">{albumName}</span></TypographyH4>
          <TypographyH4 className="text-white/50 pt-3 font-medium">Anno: <span className="font-bold text-white">{date}</span></TypographyH4>
          <TypographyH4 className="text-white/50 pt-3 font-medium">Visual: <span className="font-bold text-white">{visual}</span></TypographyH4>
        </div>
    </div>
  )
}
