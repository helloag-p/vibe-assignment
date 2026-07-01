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
     <div className="mb-4 flex justify-center">
  <p className="text-sm text-slate-400">
    Browse top creators across social platforms
  </p>
</div>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
clearSearch();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mb-6 flex justify-center">
  <span className="rounded-full bg-slate-800 px-4 py-1 text-sm text-slate-300">
    {filtered.length} creators found on{" "}
    <span className="font-semibold capitalize">{platform}</span>
  </span>
</div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

    <div className="xl:col-span-2">
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
