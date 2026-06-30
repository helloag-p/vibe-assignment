import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface SelectedProfilesState {
  selectedProfiles: UserProfileSummary[];

  addProfile: (profile: UserProfileSummary) => void;

  removeProfile: (username: string) => void;

  isSelected: (username: string) => boolean;

  clearProfiles: () => void;
}

export const useSelectedProfilesStore =
  create<SelectedProfilesState>()(
    persist(
      (set, get) => ({
        selectedProfiles: [],

        addProfile: (profile) => {
          const exists = get().selectedProfiles.some(
            (p) => p.username === profile.username
          );

          if (exists) return;

          set({
            selectedProfiles: [...get().selectedProfiles, profile],
          });
        },

        removeProfile: (username) =>
          set({
            selectedProfiles: get().selectedProfiles.filter(
              (p) => p.username !== username
            ),
          }),

        isSelected: (username) =>
          get().selectedProfiles.some((p) => p.username === username),

        clearProfiles: () =>
          set({
            selectedProfiles: [],
          }),
      }),
      {
        name: "selected-profiles",
      }
    )
  );