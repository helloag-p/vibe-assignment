// import { useState } from "react";
// import type { Platform } from "@/types";
import { useSearchStore } from "@/store/useSearchStore";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { SelectedProfiles } from "@/components/SelectedProfiles";

export function SearchPage() {
  const {
  platform,
  searchQuery,
  setPlatform,
  setSearchQuery,
  clearSearch,
} = useSearchStore();

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

 const handleProfileClick = (username: string) => {
  console.log("Clicked profile:", username);
};

  return (
    <Layout title="Find Influencers">
      <p className="text-gray-500 mb-4 text-sm">
        Browse top creators across social platforms
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
clearSearch();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-2">
        Showing {filtered.length} of {allProfiles.length} on {platform}
      </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <div className="lg:col-span-2">
        <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={handleProfileClick}
      />
    </div>

    <SelectedProfiles />

</div>
    </Layout>
  );
}
