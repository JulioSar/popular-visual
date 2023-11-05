import type {
  MusicProps,
  PlayerStoreState,
} from "@/components/interfaces/MusicPlayer";
import { create } from "zustand";

export const usePlayerStore = create<PlayerStoreState>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  setVolume: (volume: number) => set({ volume }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: MusicProps) => set({ currentMusic }),
}));
