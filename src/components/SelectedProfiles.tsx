import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

export function SelectedProfiles() {
  const { selectedProfiles, removeProfile } = useSelectedProfilesStore();

  return (
    <div className="border rounded-lg p-4 h-fit bg-white">
      <h2 className="text-lg font-semibold mb-4">
        Selected Profiles ({selectedProfiles.length})
      </h2>

      {selectedProfiles.length === 0 ? (
        <p className="text-sm text-gray-500">
          No profiles selected.
        </p>
      ) : (
        <div className="space-y-3">
          {selectedProfiles.map(profile => (
            <div
              key={profile.user_id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="font-medium">
                    @{profile.username}
                  </p>

                  <p className="text-sm text-gray-500">
                    {profile.fullname}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeProfile(profile.username)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}