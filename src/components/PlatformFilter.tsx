import { Search } from "lucide-react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8">
      {/* Platform Buttons */}
      <div className="mb-6 flex justify-center gap-3">
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            type="button"
            onClick={() => onChange(platform)}
            className={`
              rounded-full
              px-5
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                selected === platform
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-indigo-500 hover:text-white"
              }
            `}
          >
            {getPlatformLabel(platform)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mx-auto w-full max-w-3xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators..."
          className="
            h-12
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            pl-11
            pr-4
            text-white
            placeholder:text-slate-500
            outline-none
            transition
            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-500/20
          "
        />
      </div>
    </div>
  );
}