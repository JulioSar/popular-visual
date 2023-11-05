import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";
import type {
  CardPlayButtonProps,
  PlayerStoreState,
} from "./interfaces/MusicPlayer";

export function CardPlayButton({ id }: CardPlayButtonProps) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state as PlayerStoreState);
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

  const handleCardMediaBtn = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }
    const url = `/api/get-info-playlist.json?id=${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ playlist, song: songs[0], songs });
      });
  };

  return (
    <button
      className="rounded-full bg-green-500 p-4 cursor-pointer hover:scale-105 transition hover:bg-green-400"
      onClick={handleCardMediaBtn}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
