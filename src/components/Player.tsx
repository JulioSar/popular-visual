import { usePlayerStore } from "@/store/playerStore";
import { useState, useRef, useEffect } from "react";
import type { PlayerStoreState } from "./interfaces/MusicPlayer";
import { CurrentSong } from "./CurrentSong";

export const Pause = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = () => (
  <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

export function Player() {
  const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(
    (state) => state as PlayerStoreState
  );
  const audioRef = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleMediaClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
    }

    setIsPlaying(!isPlaying);
  };
  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <CurrentSong
        image={currentMusic.song?.image}
        title={currentMusic.song?.title}
        artists={currentMusic.song?.artists}
      />

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flx justify-center">
          <button
            className="bg-white rounded-full p-2"
            onClick={handleMediaClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">Volume...</div>
      <audio ref={audioRef} />
    </div>
  );
}
