import type { SongProps } from "./interfaces/MusicPlayer";

export function CurrentSong({ image, title, artists }: SongProps) {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image ? image : ""} alt={title ? title : ""} />
      </picture>
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="texts-xs opacity-80">{artists?.join(", ")}</span>
      </div>
    </div>
  );
}
