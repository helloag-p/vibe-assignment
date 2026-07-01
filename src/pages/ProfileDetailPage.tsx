import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  Users,
  Heart,
  MessageCircle,
  Eye,
  FileText,
  ExternalLink,
} from "lucide-react";

import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";
import type { Platform } from "@/types";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const { addProfile, isSelected } = useSelectedProfilesStore();

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username, platform).then((data) => {
      setProfileData(data);
      setLoading(false);
    });
  }, [username, platform]);

  if (!username) {
    return (
      <Layout title="Invalid Profile">
        <p className="text-red-400">Invalid profile.</p>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-center text-slate-400 py-20">Loading profile...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title="Profile Not Found">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
          <p className="text-red-300 mb-4">Could not load profile details.</p>

          <Link to="/" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const selected = isSelected(user.username ?? user.handle ?? "");

  return (
    <Layout title={user.fullname}>
      <Link
        to="/"
        className="inline-block mb-6 text-indigo-400 hover:text-indigo-300"
      >
        ← Back to Search
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
          <img
            src={user.picture}
            alt={user.fullname}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.fullname,
              )}&background=4f46e5&color=fff&bold=true`;
            }}
            className="mx-auto h-40 w-40 rounded-full object-cover border border-slate-700"
          />

          <h2 className="mt-5 text-center text-3xl font-bold text-white">
            {user.fullname}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-400 leading-relaxed">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </p>

          <div className="mt-4 flex justify-center">
            <span className="rounded-full bg-indigo-600 px-4 py-1 text-sm">
              {platform}
            </span>
          </div>

          {user.description && (
            <p className="mt-6 text-center text-slate-300">
              {user.description}
            </p>
          )}

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => addProfile(user)}
              disabled={selected}
              className={`flex-1 rounded-lg py-3 font-medium transition ${
                selected
                  ? "bg-green-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {selected ? "✓ Added" : "+ Add"}
            </button>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-700 px-4 flex items-center justify-center hover:bg-slate-800"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* RIGHT */}

        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              icon={<Users size={20} />}
              title="Followers"
              value={formatFollowers(user.followers)}
            />

            <StatCard
              icon={<Heart size={20} />}
              title="Engagement"
              value={formatEngagementRate(user.engagement_rate)}
            />

            {user.posts_count !== undefined && (
              <StatCard
                icon={<FileText size={20} />}
                title="Posts"
                value={String(user.posts_count)}
              />
            )}

            {user.avg_likes !== undefined && (
              <StatCard
                icon={<Heart size={20} />}
                title="Avg Likes"
                value={formatFollowers(user.avg_likes)}
              />
            )}

            {user.avg_comments !== undefined && (
              <StatCard
                icon={<MessageCircle size={20} />}
                title="Avg Comments"
                value={String(user.avg_comments)}
              />
            )}

            {user.avg_views !== undefined && user.avg_views > 0 && (
              <StatCard
                icon={<Eye size={20} />}
                title="Avg Views"
                value={formatFollowers(user.avg_views)}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function StatCard({ icon, title, value }: CardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <div className="text-indigo-400">{icon}</div>

      <p className="mt-4 text-sm text-slate-400">{title}</p>

      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
