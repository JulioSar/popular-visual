export interface PlayerStoreState {
  currentMusic: MusicProps;
  isPlaying: boolean;
  volume: number;
  setVolume: (value: number) => void;
  setIsPlaying: (value: boolean) => void;
  setCurrentMusic: (currentMusic: MusicProps) => void;
}

export interface MusicProps {
  playlist: { id: string } | null;
  song: { id: string; title: string; image: string; artists: string[] } | null;
  songs: string[];
}

export interface CardPlayButtonProps {
  id: string;
}

export interface SongProps {
  image: string | undefined;
  title: string | undefined;
  artists: string[] | undefined;
}
