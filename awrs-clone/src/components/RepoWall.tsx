"use client";

import { useEffect, useState } from "react";
import { FiGitBranch, FiStar } from "react-icons/fi";
import { profile } from "@/content/profile";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export default function RepoWall() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(
      `https://api.github.com/users/${profile.social.githubUser}/repos?sort=updated&per_page=24`
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Repo[]) => {
        if (!active) return;
        setRepos(
          data
            .filter((r) => r.description || r.language)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
        );
      })
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <p className="py-16 text-center text-text-tertiary">
        Could not load repositories right now.
      </p>
    );
  }

  if (!repos) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-2xl border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary"
        >
          <h3 className="font-semibold text-text">{repo.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
            {repo.description ?? "—"}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-text-tertiary">
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiStar size={12} /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <FiGitBranch size={12} /> {repo.forks_count}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
