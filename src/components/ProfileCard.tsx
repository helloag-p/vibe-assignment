import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Plus } from "lucide-react";

import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import { formatFollowers } from "@/utils/formatters";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const { addProfile, isSelected } = useSelectedProfilesStore();
  const slug = profile.username ?? profile.handle ?? "";

  const selected = isSelected(slug);
  const handleClick = () => {
    onProfileClick?.(slug);
    navigate(`/profile/${slug}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      data-search={searchQuery}
      className="
        group
        flex
        items-center
        flex-col sm:flex-row
        items-start sm:items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-indigo-500
        hover:bg-slate-800
        cursor-pointer
        w-full
max-w-2xl
mx-auto
        
      "
    >
      <div className="flex items-center gap-4 flex-1">
        <img
  src={profile.picture}
  alt={profile.fullname}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        profile.fullname
      )}&background=4f46e5&color=fff&bold=true`;
  }}
  className="h-14 w-14 rounded-full object-cover border border-slate-700"
/>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white">
              @{profile.username ?? profile.handle}
            </h3>

            <VerifiedBadge verified={profile.is_verified} />
          </div>

          <p className="text-sm text-slate-400">
            {profile.fullname}
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {formatFollowers(profile.followers)} Followers
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          addProfile({
  ...profile,
  username: slug,
});
        }}
        disabled={selected}
        className={`w-full sm:w-auto inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
          selected
            ? "bg-green-600 text-white"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {selected ? (
          <>
            <Check size={16} />
            Added
          </>
        ) : (
          <>
            <Plus size={16} />
            Add
          </>
        )}
      </button>
    </div>
  );
});