import { Trash2, Users } from "lucide-react";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

export function SelectedProfiles() {
  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles,
  );

  const removeProfile = useSelectedProfilesStore(
    (state) => state.removeProfile,
  );

  return (
    <div className="sticky top-6 rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-400" />

          <div>
            <h2 className="text-lg font-semibold text-white">
              Selected Profiles
            </h2>

            <p className="text-sm text-slate-400">
              {selectedProfiles.length} selected
            </p>
          </div>
        </div>
      </div>

      {selectedProfiles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-700 p-6 text-center">
          <p className="text-slate-400">Start building your influencer list.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {selectedProfiles.map((profile) => (
            <div
              key={profile.user_id}
              className="flex items-center justify-between rounded-lg border border-slate-700 p-3 transition hover:bg-slate-800"
            >
              <div className="flex items-center gap-3">
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile.fullname,
                    )}&background=4f46e5&color=fff&bold=true`;
                  }}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-medium text-white">
                    @{profile.username ?? profile.handle}
                  </p>

                  <p className="text-sm text-slate-400">{profile.fullname}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  removeProfile(profile.username ?? profile.handle ?? "")
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
