import { useEffect, useState } from "react";
import { Slider } from "./Slider";

export function SongControl({ audio }: { audio: any }) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };

  const songDuration = audio?.current?.duration ?? 0;

  const formatTime = (time: number) => {
    if (time == null) return `0:00`;

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    const totalTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    return totalTime;
  };

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>
      <Slider
        defaultValue={[0]}
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-[400px]"
        onValueChange={(value) => {
          audio.current.currentTime = value;
        }}
      />
      <span className="opacity-50 w-12">
        {songDuration ? formatTime(songDuration) : null}
      </span>
    </div>
  );
}
