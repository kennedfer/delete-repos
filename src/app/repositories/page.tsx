"use client";

import RepositoriesTable from "@/components/RepositoriesTable/RepositoriesTable";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface GitHubUser {
  login: string;
  name?: string;
  public_repos: number;
  // Outros campos que você usa
}

interface GitHubRepo {
  id: number;
  name: string;
  // Outros campos que você usa
}

export default function RepositoriesPage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(2);
  const perPage = 15;

  const fetchUser = useCallback(async () => {
    if (!session?.user?.accessToken) return;

    try {
      const response = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      });

      if (!response.ok) throw new Error("Erro ao buscar usuário");

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    }
  }, [session]);

  const fetchRepos = useCallback(
    async (signal) => {
      if (!user || !session?.user?.accessToken) return;

      try {
        const response = await fetch(
          `https://api.github.com/users/${user.login}/repos?per_page=${perPage}&page=${page}`,
          {
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
            signal,
          }
        );

        if (!response.ok) throw new Error("Erro ao buscar repositórios");

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      }
    },
    [user, session, page]
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }

    if (status === "authenticated") {
      fetchUser();
    }
  }, [status, fetchUser]);

  useEffect(() => {
    const controller = new AbortController();
    fetchRepos(controller.signal);
    return () => controller.abort();
  }, [fetchRepos]);

  if (status === "loading" || !user) {
    return <h3>Carregando...</h3>;
  }

  if (error) {
    return <h3>Erro: {error}</h3>;
  }

  return (
    <div>
      <p>Bem-vindo, {session?.user?.name}</p>
      <p>Repositórios públicos: {user.public_repos}</p>
      <RepositoriesTable repositories={repos} page={page} setPage={setPage} />
    </div>
  );
}
