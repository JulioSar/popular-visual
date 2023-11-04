import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";
import type {
  CardPlayButtonProps,
  PlayerStoreState,
} from "./interfaces/MusicPlayer";
import { playlists } from "@/lib/data";

export function CardPlayButton({ id }: CardPlayButtonProps) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state as PlayerStoreState);
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id;

  const handleCardMediaBtn = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ playlist, song: songs[0], songs });
      });
  };

  return (
    <button
      className="rounded-full bg-green-500 p-4 cursor-pointer"
      onClick={handleCardMediaBtn}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
