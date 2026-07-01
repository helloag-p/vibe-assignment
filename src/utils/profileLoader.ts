import type {
  Platform,
  ProfileDetailResponse,
  FullUserProfile,
} from "@/types";
import { extractProfiles } from "./dataHelpers";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string,
  platform: Platform
): Promise<ProfileDetailResponse | null> {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  // Detailed profile exists
  if (loader) {
    const result = await loader();
    return (
      (result as { default?: ProfileDetailResponse }).default ??
      (result as ProfileDetailResponse)
    );
  }

  // Fallback to search data
  const summary = extractProfiles(platform).find(
    (p) => p.username === username
  );

  if (!summary) return null;

  const fallbackProfile: FullUserProfile = {
    ...summary,
    description: "Detailed analytics are not available for this creator.",
    posts_count: undefined,
    avg_likes: undefined,
    avg_comments: undefined,
    avg_reels_plays: undefined,
    gender: undefined,
    age_group: undefined,
  };

  return {
    cached: false,
    data: {
      success: true,
      user_profile: fallbackProfile,
    },
  };
}