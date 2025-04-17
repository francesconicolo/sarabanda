import YouTubePlayer from "react-player/youtube";
import { TypographyH4 } from "../typography/TypographyH4";


import { TypographyH2 } from "../typography/TypographyH2";
import { TypographySmall } from "../typography/TypographySmall";
import { Play } from "lucide-react";

export default function CardMusic({artist,songName,albumName,date,url,visual,playing,focus,setPlaying}: {artist:string,songName:string,albumName:string,date:string,url:string,visual:string,playing:boolean,focus:boolean,setPlaying:React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className={"w-[330px] h-[660px] bg-black rounded-3xl overflow-hidden border mt-6 " + (focus ? " border-green-700 " : "border-destructive")}>
        <YouTubePlayer
          width={'100%'}
          height={200}
          controls={false}
          url={'https://www.youtube.com/watch?v='+url}
          playing={playing}
          onPlay={()=>setPlaying(true)}
          onPause={()=>setPlaying(false)}
        />
        <div className={"flex justify-center mt-3  "}>
          <div className={ (playing ? " " : " hidden")}>
            <div className={"containerWaves "}>
              <div className="box box1"></div>
              <div className="box box2"></div>
              <div className="box box3"></div>
              <div className="box box4"></div>
              <div className="box box5"></div>
            </div>
          </div>
          <Play className={"w-12 h-12 " + (playing ? " hidden " : " ")}/>
        </div>
        <div className="p-4">
          <div className="h-[170px]">
            <TypographyH2 className="text-white italic max-h-[120px] overflow-y-scroll">{songName}</TypographyH2>
            <div className="text-white font-medium">{artist}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center leading-4">
              <TypographySmall className="text-white/80" >Album</TypographySmall>
              <TypographyH4 className="text-white font">{albumName}</TypographyH4>
            </div>
            <div className="text-center leading-4">
              <TypographySmall className="text-white/80" >Anno</TypographySmall>
              <TypographyH4 className="text-white font">{date}</TypographyH4>
            </div>
            <div className="text-center leading-4">
              <TypographySmall className="text-white/80" >Visualizzazioni</TypographySmall>
              <TypographyH4 className="text-white font">{visual}</TypographyH4>
            </div>
          </div>
        </div>
    </div>
  )
}
