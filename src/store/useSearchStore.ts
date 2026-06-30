import { create } from "zustand";
import type { Platform } from "@/types";

interface SearchStore {
  platform: Platform;
  searchQuery: string;

  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  platform: "instagram",
  searchQuery: "",

  setPlatform: (platform) => set({ platform }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  clearSearch: () => set({ searchQuery: "" }),
}));